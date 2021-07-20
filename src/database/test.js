const Database = require('./db')
const createProffy = require('./createProffy')
Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: 'Fabrício',
        avatar: 'https://scontent.fthe7-2.fna.fbcdn.net/v/t1.6435-1/c50.0.200.200a/p200x200/39734949_1563491753757163_6421776543395086336_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeEqoSuNwNkWeA2UC_s5qV0TP9Rk-Gs8x28_1GT4azzHb2wE6gnQ0cVcrWblkB_sTC6iWPmmLNcD4Rz7JzYChxVS&_nc_ohc=lbrvMJ9n5QMAX-2jqsX&_nc_ht=scontent.fthe7-2.fna&oh=448bbb283d2aaa9e9124599c08cd2a4d&oe=60F97386',
        whatsapp: '86995354198',
        bio: 'Professor de Português no Curso Infantil Mais Língua. Graduado em Letras/Português pela Universidade Federal do Piauí',
        subject: 'Português',
        cost: '50',
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }

    classValue = {
        subject: 1,
        cost: '50'
        // O profy id virá pelo banco de dados
    }
    
    classScheduleValues = [
        
        // O class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})  
  
    // Consultar os dados inseridos

    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)
 
    // Consultar as classes de um determinado professor
    
    // E trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h as 18h
    // o horário time_from(8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima
  
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = '1'
        AND class_schedule.weekday = '0'
        AND class_schedule.time_from <= '520'
        AND class_schedule.time_to > '520'
    `)

    console.log(selectClassesSchedules)

})