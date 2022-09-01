module.exports = class Data1649158683468 {
    name = 'Data1649158683468'

    async up(db) {
        await db.query(`ALTER TABLE "swap" ADD COLUMN "meta_swap_address" bytea NULL`)
    }

    async down(db) {
    }
}