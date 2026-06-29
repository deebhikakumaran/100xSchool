

function App() {

  const posts = [
    {
      name: "deebhika",
      content: "i won a national award"
    },
    {
      name: "guhan",
      content: "i am joining aerospace engg"
    }
  ]

  // let postComponents=[
  //   <Post name="deebhika" content="i won a national award" />,
  //   <Post name="guhan" content="i am joining aerospace engg"/>
  // ]

  setInterval(()=>{
    console.log("interval ran.")
    posts.push({
      name: "sri",
      content: "this is me."
    })
    console.log(posts)
  }, 1000)

  let postComponents=posts.map(p => <Post name={p.name} content={p.content} />)

  return (
    <>
      <h1 style={{paddingLeft:20}}>Linkedin</h1>
      {postComponents}
    </>
  )
}

function Post(props: any) {
  return (
    <div style={{margin: 20, borderRadius: 20, padding: 20, backgroundColor: "grey", fontSize: 20, border: "2px solid black"}}>
      <div>
        <b>
          {props.name}
        </b>
      </div>
      <div>{props.content}</div>
    </div>
  )
}

export default App
