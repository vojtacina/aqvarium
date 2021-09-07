import { useSession } from 'next-auth/client'
import InflectionGenerator from '../components/InflectionGenerator'
import { useBubbleView } from '../lib/Fetchers'
import Loading from '../components/Loading'
import Bubble from '../components/Bubble'
import Welcome from '../components/Welcome'



export default function MainPage() {

    const [session, loading] = useSession()
    const { bubbles, isLoading, isError } = useBubbleView()

    return (
        <>
            {(!session.user || !session.user.name || !session.user.image) ?
                <Welcome session={session} />
                :
                <div className="w-full mt-60px appear p-24px">
                    <div className="py-16px bg-white bg-opacity-5 rounded-lg px-6px my-6px"><span>👋 Vítej zpět, </span><span> {InflectionGenerator(session?.user?.name, 2)}! </span></div>
                    <div className="grid sm:grid-cols-3 gap-x-12px gap-y-12px grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 mt-20px">
                        {bubbles?.map((bubble, i) =>
                            <Bubble data={bubble} i={i} />
                        )}
                        {isLoading &&
                            <Loading />
                        }
                    </div>
                </div>
            }
        </>
    )
}