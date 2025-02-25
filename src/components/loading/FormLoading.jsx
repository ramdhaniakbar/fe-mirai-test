const FormLoading = () => {
  return (
    <div className="mx-auto w-full max-w-xl rounded-md">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 w-1/2 rounded bg-gray-300"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 h-28 rounded bg-gray-300"></div>
              <div className="col-span-3 h-36 rounded bg-gray-300"></div>
              <div className="col-span-3 h-20 rounded bg-gray-300"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-10 rounded bg-gray-300"></div>
              <div className="col-span-1 h-10 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLoading
