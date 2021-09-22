import Image from 'next/image'


export default function Message({user, message}) {


    return (
       <div className="flex items-start my-4px">
           <div className="w-32px h-32px rounded-full overflow-hidden relative flex-shrink-0">
               {user.image ?
               <img src={user.image} width="100%" height="100%" className="object-cover" />
               : 
               <div className="w-full h-full bg-gray-700"></div>
               }
               
           </div>
           <div className="mx-8px text-12 pt-3px">{user.username}:</div>
           <div>{message}</div>
       </div> 
    )
}