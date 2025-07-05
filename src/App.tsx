import { useGetItemsQuery } from './redux/api/baseApi'

function App() {
  const { data, isError, isLoading } = useGetItemsQuery(undefined)
  console.log(data, isError, isLoading)

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Counter with redux</h1>
    </div>
  )
}

export default App
