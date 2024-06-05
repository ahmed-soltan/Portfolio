
const page = ({params}:{params:{projectId:string}}) => {
  return (
    <div>
        ID : {"    "}{params.projectId}
    </div>
  )
}

export default page