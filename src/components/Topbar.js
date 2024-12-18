import React from 'react'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import user from '../assets/images/Ellipse 5.png'

function Topbar() {
  return (
    <div className='flex items-center justify-between h-[68px] border-b w-full '>
        <div className='w-32 h-7 flex gap-2 items-center ml-4'>
            <IconButton>
                <MenuIcon />
            </IconButton>
            <p className='font-bold text-xl'>Dashboard</p>
        </div>
        <div className='flex bg-[#F9E3DA] items-center justify-center rounded-lg w-28 h-10 gap-x-1 mr-4'>
            <img className='w-6 h-6' src={user} alt="user picture" />
            <p className='text-sm ml-2'>Admin</p>
            <KeyboardArrowDownIcon/>

        </div>
    </div>
  )
}

export default Topbar