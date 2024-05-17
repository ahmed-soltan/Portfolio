import { Loader, Loader2 } from "lucide-react"

const loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin dark:text-white"/>
    </div>
  )
}

export default loading