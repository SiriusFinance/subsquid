module.exports = class Data1649158683467 {
    name = 'Data1649158683467'

    async up(db) {
        await db.query(`CREATE TABLE "ve_holder" ("id" character varying NOT NULL, "address" text NOT NULL, "updated_at" numeric NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fd0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "pkex_stake_acct" ("id" character varying NOT NULL, "address" text NOT NULL, "last_action_time" numeric NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fd1" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "ve_holder"`)
        await db.query(`DROP TABLE "pkex_stake_acct"`)
    }
}