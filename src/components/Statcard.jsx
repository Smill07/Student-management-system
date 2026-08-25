const StatCard = (props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm w-1/4 mt-5 flex-col justify-between">
        <div className="flex justify-between">
      <p className="text-sm text-gray-500">{props.title}</p>
      <img className='h-5 w-5 rounded-full' src={props.logo} alt="" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {props.num}
      </h2>
      <p className="text-xs text-gray-500 mt-1">{props.discription}</p>
    </div>
  )
}

export default StatCard
