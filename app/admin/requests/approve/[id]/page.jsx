import FilePreview from "@/src/components/admin/FilePreview";

const Approve = ({params:{id}})=>{
    return(
        <div>
            <div className={'flex justify-end p-2 gap-2'}>
                <span className={'py-1 px-2  bg-red-600 text-white font-black text-center rounded-2xl shadow-sm shadow-gray-700 text-xs cursor-pointer'}>Cancel</span>
                <span className={'py-1 px-2 bg-blue-600 text-white font-black text-center rounded-2xl shadow-sm shadow-gray-700 text-xs cursor-pointer'}>Approve</span>
            </div>

            <FilePreview fileUrl={"http://localhost:8000/api/documents/uploads/cv/GGC4GYopKpsFzIA4niClcGbtARz7BLCHsDjyZywT.pdf"} />
        </div>
    )
}

export default Approve