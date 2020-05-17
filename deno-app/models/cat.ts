import db  from "../database/database.ts";

export class Cat {
    _id: {
        $oid: string;
    };
    name: string;

    constructor(_id: {
        $oid: string;
    }, name: string) {
        this._id = _id;
        this.name = name;
    }

    static create = async (cat: Cat) => {
        const cats = db.getDatabase.collection('cats');
        return await cats.insertOne(cat);
    }

    static update = async (id: String, name: string) => {
        const cats = db.getDatabase.collection('cats');
        const { matchedCount, modifiedCount, upsertedId } = await cats.updateOne(
            { _id: { "$oid": id } },
            { $set: { name: name } }
        );
        return matchedCount;
    }

    static delete = async (id: string) => {
        const cats = db.getDatabase.collection('cats');
        return await cats.deleteOne({ _id: { "$oid": id } });   
    }

    static selectById = async (id: string) => {
        const cats = db.getDatabase.collection('cats');
        return await cats.findOne({ _id: { "$oid": id } });
    }

    static selectAll = async () => {
        const cats = db.getDatabase.collection('cats');
        return await cats.find();
    }
}
