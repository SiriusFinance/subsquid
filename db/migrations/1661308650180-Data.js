module.exports = class Data1661308650180 {
    name = 'Data1661308650180'

    async up(db) {
        await db.query(`ALTER TABLE "swap" ADD COLUMN "meta_swap_address" bytea NULL`)
    }

    async down(db) {
    }
}