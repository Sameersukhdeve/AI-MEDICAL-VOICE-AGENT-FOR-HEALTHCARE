import React from 'react'
import HistoryList from '@/app/(routes)/dashboard/_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'



function Dashboard() {
  return (
    <div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text -2xl'>My Dashboard</h2>
            <AddNewSessionDialog></AddNewSessionDialog>
        </div>
        <HistoryList />
        <DoctorsAgentList>
        </DoctorsAgentList>



    </div>


  )
}

export default Dashboard