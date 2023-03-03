import Head from "next/head"
import { useRouter } from "next/router"

const TestItem = ({id}:any) => {

    return (
        <>
            <Head>
                <title>{id}</title>
                <meta property="og:title" content="Business Box asdfsdf" />
            </Head>
            <div style={{marginTop: "100px"}}>
                {id}
            </div>
        </>
    )
}

export default TestItem

export async function getServerSideProps(context: any) {
    const { id } = context.params

    return {
        props: {
            id
        },
    }
}