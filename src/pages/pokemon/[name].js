import {useRouter} from "next/router"
import useSWR from "swr"
import Head from "next/head"
import {Container, Row, Col} from "react-bootstrap"
import pokemon from "../../../public/pokemon.json"

const fetcher = 
    async (endpoint) => fetch(`http://localhost:3000${endpoint}`)
        .then(res=>res.json())

//difference between async getPokemon
//and no async?
// const getPokemon = async (name) =>{
//     const myAPI = `/api/pokemon`
//     const pokemon = `?name=${name}`
//     const myEndpoint = myAPI+pokemon
//     const data = fetcher(myEndpoint)
//     return data
// }

export async function getStaticPaths(){
    // console.log(pokemon)
    return{
        paths: pokemon.map(item=>({
                params:{
                    name: item.name.english}
                })
            ),
        fallback: false
    }
}

export async function getStaticProps({params:{name}}){
    return {
        props: {
            data: pokemon.filter(({name:{english}})=> english === name)
        }
    }
}



export default  ({data:[data]}) => {

    return<>
    <div>
        <Head>
            <title>{data && data.name.english || "Pokemon"}</title>
        </Head>
   
    <Container>
        {data && <>
        <h1><div>{data.name.english}</div></h1>
        <Row>
            <Col xs={4}>
                 <img src={`/pokemon/${data.name.english.toLowerCase().replace(" ", "-")}.jpg`} style={{width: "100%"}} alt="" />
            </Col>
            <Col xs={8}>
                {Object.entries(data.base).map(([key,value])=>
                    {
                        return <Row key={key}>
                                    <Col xs={2}>{key}</Col>
                                    <Col xs={10}>{value}</Col>
                                </Row>
                    })
                }
            </Col>
        </Row>
              </>  }
    </Container> 
    </div> 
    
    </>
}