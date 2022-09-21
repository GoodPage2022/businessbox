import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

    const data = req.body
    const user = data.user
    const token = user.api_key
    const userFavouritesReq = user.favourites ?? []
    
    const projectId = data.project._id
    
    const projectTitle = data.project.title
    const favouriteIds = userFavouritesReq.map((f: any) => f._id)

    let favourites = []

    if (favouriteIds.includes(projectId)) {
        favourites = userFavouritesReq.filter((f: any) => f._id != projectId)
    } else {
        favourites = [
            ...userFavouritesReq,
            {
                _id: projectId,
                link: "Businesses",
                display: projectTitle
            }
        ]
    }

    const userFavourites = {
        user: {
            _id: user._id,
            favourites
        }
    }
    
    try {
      const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/saveUser?token=${token}`, userFavourites)
      console.log(response.data.favourites);
      
      res.status(200).json( response.data.favourites ?? [] )
    } catch (err: any) {
      res.status(500).json(err)
    }
}

export default handler