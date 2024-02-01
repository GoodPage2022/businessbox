import { ObjectId } from "mongodb";
import clientPromise from "../../mongodb/mongodb";

const RaiseToTop = async (id: string) => {
  const client = await clientPromise;
  const db = client.db("bubox");

  const orderTop = await db
    .collection("collections_toporders")
    .findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          status: "Paid",
          _modified: Date.now().toString().substring(0, 10),
        },
      }
    );

  const raised = await db.collection("collections_Businesses").updateMany(
    {
      _id: {
        $in: orderTop.value?.projects.map(
          (project: any) => new ObjectId(project?._id)
        ),
      },
    },
    { $set: { _order: Date.now() } }
  );

  return orderTop;
};

export default RaiseToTop;
