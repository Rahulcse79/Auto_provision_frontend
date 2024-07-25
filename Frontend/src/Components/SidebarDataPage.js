import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { FaServer } from 'react-icons/fa6';
import { MdNetworkCell, MdChecklist, MdOutlineDisabledByDefault, MdFileUpload } from 'react-icons/md';
import { SiSmartthings } from 'react-icons/si';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { CiTimer } from 'react-icons/ci';
import { IoSettings, IoLogOutOutline } from 'react-icons/io5';
import { BsTelephoneFill } from 'react-icons/bs';
import { LiaHistorySolid } from 'react-icons/lia';
import { AiOutlineOrderedList } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SidebarDataPage = () => {
  const BaseUrl = window.location.hostname || "localhost";
  const navigate = useNavigate();

  const logOutCall = async () => {
    await Cookies.remove("session");
    await new Promise(resolve => setTimeout(resolve, 500));
     navigate("/log-in");
  };

  const SidebarData = [
    {
      title: 'Home',
      path: '/',
      onClick: '',
      icon: <AiIcons.AiFillHome />
    },
    {
      title: 'Device Detail',
      icon: <BsTelephoneFill />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'Online Devices',
          path: `http://${BaseUrl}:3000/#!/overview`,
          icon: <BsTelephoneFill />
        },
        {
          title: 'Listing Device',
          path: `http://${BaseUrl}:3000/#!/devices`,
          icon: <AiOutlineOrderedList />
        },
        {
          title: 'File Upload',
          path: `http://${BaseUrl}:3000/#!/admin/files`,
          icon: <MdFileUpload />
        }
      ]
    },
    {
      section: 'Device Management'
    },
    {
      title: 'IP phone',
      icon: <AiIcons.AiFillPhone />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'IP2LG',
          path: '/Ip-Phone-Provisioning',
          icon: <IoIcons.IoIosPaper />
        }
      ]
    },
    {
      title: 'Servers',
      icon: <FaServer />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'SIP Server',
          path: '/sip-server',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: '5G core',
          path: '/linux-provisioning',
          icon: <MdNetworkCell />,
          cName: 'sub-nav'
        },
        {
          title: 'IOT',
          icon: <SiSmartthings />
        }
      ]
    },
    {
      section: 'Scheduling'
    },
    {
      title: 'Scheduling',
      icon: <RiCalendarScheduleFill />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'Auto Scheduling',
          path: '/time-schedule',
          icon: <CiTimer />,
          cName: 'sub-nav'
        },
        {
          title: 'Auto Update List',
          path: '/auto-update',
          icon: <MdChecklist />,
          cName: 'sub-nav'
        }
      ]
    },
    {
      section: 'System Settings'
    },
    {
      title: 'System Settings',
      path: '/system-setting',
      icon: <IoSettings />
    },
    {
      title: 'Fault Logs',
      path: `http://${BaseUrl}:3000/#!/faults`,
      icon: <MdOutlineDisabledByDefault />
    },
    {
      title: 'History',
      path: '/history',
      icon: <LiaHistorySolid />
    },
    {
      section: 'Logout'
    },
    {
      title: 'Logout',
      onClick: logOutCall,
      icon: <IoLogOutOutline />
    }
  ];

  return SidebarData;
};

export default SidebarDataPage;
