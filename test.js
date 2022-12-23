(async () => {
    const { dbM } = require('./src/dbM')
    const db_pool = new dbM({
        db: '',
        key: ''
    })

    await db_pool.insert('type_01', 'test_data')

    const data = await db_pool.get('type_01')
    console.log(data);
})()