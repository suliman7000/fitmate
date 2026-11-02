import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import OpenAI from 'openai';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

const { Schema, model } = mongoose;
const Profile = model('Profile', new Schema({
  name: { type: String, default: 'My Gym Profile' },
  currentWeight: { type: Number, default: 67 },
  goalWeight: { type: Number, default: 72 },
  height: Number,
  notes: String
}, { timestamps: true }));
const Exercise = model('Exercise', new Schema({
  name: String, muscle: String, equipment: String, instructions: [String],
  sets: Number, reps: String, imageQuery: String
}));
const Workout = model('Workout', new Schema({
  day: Number, title: String, focus: String, rest: Boolean,
  exercises: [{ exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' }, name: String,
    sets: Number, reps: String, grip: String, notes: String }]
}));
const Log = model('Log', new Schema({
  date: { type: Date, default: Date.now }, workoutTitle: String,
  exerciseName: String, entries: [{ weight: String, reps: Number, note: String }],
  summary: String
}, { timestamps: true }));

const initialExercises = [
  ['Barbell Bench Press','Chest','Barbell',3,'6–8',['ثبت القدمين والكتفين','انزل البار بتحكم إلى منتصف الصدر','ادفع للأعلى دون قفل المرفق بعنف']],
  ['Incline Dumbbell Press','Chest','Dumbbells',3,'8–12',['اضبط المقعد على ميل خفيف','انزل الدمبل بمحاذاة أعلى الصدر','ادفع للأعلى بتحكم']],
  ['Seated Dumbbell Shoulder Press','Shoulders','Dumbbells',2,'8–12',['اسند الظهر','ابدأ والدمبل قرب مستوى الأذن','ادفع للأعلى دون تقويس أسفل الظهر']],
  ['Dumbbell Lateral Raise','Shoulders','Dumbbells',3,'12–20',['ارفع الذراعين جانبياً','حافظ على انثناء بسيط بالمرفق','لا تستخدم اندفاع الجسم']],
  ['Cable Chest Fly','Chest','Cable',2,'12–15',['قف بين الكابلين','قرّب اليدين أمام الصدر','حافظ على انثناء بسيط بالمرفق']],
  ['Rope Triceps Pushdown','Triceps','Cable',2,'10–15',['ثبت المرفقين بجانب الجسم','ادفع الحبل للأسفل','افصل طرفي الحبل في الأسفل']],
  ['Overhead Triceps Extension','Triceps','Cable',2,'10–15',['ثبت العضد قرب الرأس','اثنِ المرفقين خلف الرأس','مد الذراعين بتحكم']],
  ['Lat Pulldown','Back','Cable machine',3,'8–12',['قبضة واسعة قليلاً من عرض الكتفين','اسحب البار إلى أعلى الصدر','تجنب السحب خلف الرقبة أو التأرجح']],
  ['Hammer Strength Row','Back','Plate-loaded machine',3,'8–12',['استخدم المقبضين الداخليين الضيقين','ثبت الصدر على المسند','اسحب نحو أسفل الصدر ثم عد ببطء']],
  ['Seated Cable Row','Back','Cable',2,'10–12',['استخدم قبضة ضيقة محايدة','اسحب نحو البطن','حافظ على الجذع ثابتاً']],
  ['Reverse Pec Deck','Rear delts','Machine',2,'12–15',['اضبط المقعد بحيث تكون المقابض بمستوى الكتف','افتح الذراعين للخارج','تحكم بالعودة']],
  ['Incline Dumbbell Curl','Biceps','Dumbbells',2,'10–12',['اسند الظهر على مقعد مائل','ثبت المرفقين','ارفع الدمبل دون تأرجح']],
  ['Preacher Curl','Biceps','Machine or EZ bar',2,'10–12',['ثبت العضد على الوسادة','ارفع الوزن بتحكم','لا تقفل المرفق بقوة في الأسفل']],
  ['Hammer Curl','Biceps','Dumbbells',2,'12–15',['اجعل الكفين متقابلين','ثبت المرفقين بجانب الجسم','ارفع وانزل بتحكم']],
  ['Squat','Legs','Barbell',3,'6–10',['ثبت القدمين بعرض مناسب','انزل مع تحكم','حافظ على ثبات الجذع']],
  ['Leg Press','Legs','Machine',3,'10–12',['ضع القدمين بعرض الكتفين','انزل حتى مدى مريح','لا تقفل الركبتين بعنف']],
  ['Romanian Deadlift','Hamstrings','Barbell or dumbbells',3,'8–12',['ادفع الوركين للخلف','حافظ على ظهر محايد','انزل حتى شد خلف الفخذ']],
  ['Leg Curl','Hamstrings','Machine',2,'10–15',['اضبط محور الجهاز مع الركبة','اثنِ الركبتين','عد ببطء']],
  ['Leg Extension','Quads','Machine',2,'12–15',['اضبط الوسادة فوق الكاحل','مد الركبتين بتحكم','تجنب ركل الوزن']],
  ['Standing Calf Raises','Calves','Machine',3,'12–15',['انزل بالكعب لمدى مريح','ارفع على مشط القدم','توقف لحظة في الأعلى']],
  ['Incline Chest Press Machine','Chest','Machine',3,'8–12',['اضبط المقعد','ادفع للأمام بتحكم','لا ترفع الكتفين']],
  ['Machine Chest Press','Chest','Machine',2,'10–12',['ثبت الظهر','ادفع المقابض للأمام','عد ببطء']],
  ['Cable Biceps Curl','Biceps','Cable',2,'10–15',['ثبت المرفقين','اثنِ الذراعين','تحكم بالعودة']]
];

const split = [
 {day:1,title:'PUSH',focus:'صدر · أكتاف · ترايسبس',items:[['Barbell Bench Press',3,'6–8'],['Incline Dumbbell Press',3,'8–12'],['Seated Dumbbell Shoulder Press',2,'8–12'],['Dumbbell Lateral Raise',3,'12–20'],['Cable Chest Fly',2,'12–15'],['Rope Triceps Pushdown',2,'10–15'],['Overhead Triceps Extension',2,'10–15']]},
 {day:2,title:'PULL',focus:'ظهر · كتف خلفي · بايسبس',items:[['Lat Pulldown',3,'8–12','قبضة واسعة'],['Hammer Strength Row',3,'8–12','المقبضان الداخليان الضيقان'],['Seated Cable Row',2,'10–12','قبضة ضيقة محايدة'],['Reverse Pec Deck',2,'12–15'],['Incline Dumbbell Curl',2,'10–12'],['Preacher Curl',2,'10–12'],['Hammer Curl',2,'12–15']]},
 {day:3,title:'REST',focus:'استشفاء',rest:true,items:[]},
 {day:4,title:'LEGS',focus:'أرجل كاملة',items:[['Squat',3,'6–10'],['Leg Press',3,'10–12'],['Romanian Deadlift',3,'8–12'],['Leg Curl',2,'10–15'],['Leg Extension',2,'12–15'],['Standing Calf Raises',3,'12–15']]},
 {day:5,title:'REST',focus:'استشفاء',rest:true,items:[]},
 {day:6,title:'UPPER',focus:'الجزء العلوي',items:[['Incline Chest Press Machine',3,'8–12'],['Lat Pulldown',3,'8–12','قبضة متوسطة'],['Machine Chest Press',2,'10–12'],['Seated Cable Row',2,'10–12'],['Dumbbell Lateral Raise',2,'12–15'],['Rope Triceps Pushdown',2,'10–15'],['Cable Biceps Curl',2,'10–15']]},
 {day:7,title:'REST',focus:'استشفاء',rest:true,items:[]}
];

async function seed() {
  if (await Profile.countDocuments() === 0) await Profile.create({ name:'Suleyman', currentWeight:67, goalWeight:72 });
  if (await Exercise.countDocuments() === 0) {
    const docs = initialExercises.map(([name,muscle,equipment,sets,reps,instructions]) => ({name,muscle,equipment,sets,reps,instructions,imageQuery:name+' gym exercise correct form'}));
    await Exercise.insertMany(docs);
  }
  if (await Workout.countDocuments() === 0) {
    const all = await Exercise.find();
    const byName = Object.fromEntries(all.map(e=>[e.name,e]));
    for (const day of split) await Workout.create({
      day:day.day,title:day.title,focus:day.focus,rest:!!day.rest,
      exercises:day.items.map(([name,sets,reps,grip])=>({exerciseId:byName[name]._id,name,sets,reps,grip:grip||'',notes:''}))
    });
  }
}
app.get('/api/health', (_,res)=>res.json({ok:true}));
app.get('/api/profile', async (_,res)=>res.json(await Profile.findOne()));
app.put('/api/profile', async (req,res)=>{
  const p=await Profile.findOneAndUpdate({},{$set:req.body},{new:true,upsert:true});
  res.json(p);
});
app.get('/api/exercises', async (req,res)=>{
  const filter=req.query.muscle?{muscle:req.query.muscle}:{};
  res.json(await Exercise.find(filter).sort({muscle:1,name:1}));
});
app.get('/api/workouts', async (_,res)=>res.json(await Workout.find().sort({day:1})));
app.get('/api/logs', async (_,res)=>res.json(await Log.find().sort({date:-1}).limit(100)));
app.post('/api/logs', async (req,res)=>{
  const log=await Log.create(req.body); res.status(201).json(log);
});
app.delete('/api/logs/:id', async (req,res)=>{
  await Log.findByIdAndDelete(req.params.id); res.json({ok:true});
});
app.post('/api/coach', async (req,res)=>{
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'أضف OPENAI_API_KEY إلى ملف server/.env لتفعيل المساعد الذكي.'});
  const [profile,workouts,logs]=await Promise.all([Profile.findOne(),Workout.find(),Log.find().sort({date:-1}).limit(20)]);
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  try {
    const response=await client.chat.completions.create({
      model:process.env.OPENAI_MODEL||'gpt-4.1-mini',
      messages:[
        {role:'system',content:`أنت مدرب لياقة مساعد. أجب بالعربية الشامية الواضحة وباختصار عملي. استخدم بيانات المستخدم ولا تخترع أوزاناً أو نتائج. لا تقدم تشخيصاً طبياً. بيانات الملف: ${JSON.stringify(profile)}. البرنامج: ${JSON.stringify(workouts)}. آخر السجلات: ${JSON.stringify(logs)}.`},
        {role:'user',content:String(req.body.message||'')}
      ]
    });
    res.json({reply:response.choices[0]?.message?.content||'لم أتمكن من إنشاء إجابة.'});
  } catch(e) { res.status(500).json({error:'تعذر الاتصال بالمساعد الذكي. تحقق من إعدادات المفتاح.'}); }
});
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:'حدث خطأ في الخادم'});});

const port=process.env.PORT||5000;
if(!process.env.MONGODB_URI) {
  console.error('Missing MONGODB_URI. Copy .env.example to .env and configure it.');
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI)
 .then(async()=>{await seed();app.listen(port,()=>console.log(`FitMate API running on http://localhost:${port}`));})
 .catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1);});
