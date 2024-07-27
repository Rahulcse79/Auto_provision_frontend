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

  const iconColor = { color: '#9cf2ff' };

  const SidebarData = [
    {
      title: 'Dashboard',
      path: '/',
      onClick: '',
      icon: <AiIcons.AiFillHome style={iconColor} />
    },
    {
      title: 'Device Detail',
      icon: <BsTelephoneFill style={iconColor} />,
      iconClosed: <RiIcons.RiArrowDownSFill style={iconColor} />,
      iconOpened: <RiIcons.RiArrowUpSFill style={iconColor} />,
      subNav: [
        {
          title: 'Online Devices',
          path: `http://${BaseUrl}:3000/#!/overview`,
          icon: <BsTelephoneFill style={iconColor} />
        },
        {
          title: 'Listing Device',
          path: `http://${BaseUrl}:3000/#!/devices`,
          icon: <AiOutlineOrderedList style={iconColor} />
        },
        {
          title: 'File Upload',
          path: `http://${BaseUrl}:3000/#!/admin/files`,
          icon: <MdFileUpload style={iconColor} />
        }
      ]
    },
    {
      section: 'Device Management'
    },
    {
      title: 'IP phone',
      icon: <AiIcons.AiFillPhone style={iconColor} />,
      iconClosed: <RiIcons.RiArrowDownSFill style={iconColor} />,
      iconOpened: <RiIcons.RiArrowUpSFill style={iconColor} />,
      subNav: [
        {
          title: 'IP2LG',
          path: '/Ip-Phone-Provisioning',
          icon: <IoIcons.IoIosPaper style={iconColor} />
        }
      ]
    },
    {
      title: 'Servers',
      icon: <FaServer style={iconColor} />,
      iconClosed: <RiIcons.RiArrowDownSFill style={iconColor} />,
      iconOpened: <RiIcons.RiArrowUpSFill style={iconColor} />,
      subNav: [
        {
          title: 'SIP Server',
          path: '/sip-server',
          icon: <IoIcons.IoIosPaper style={iconColor} />,
          cName: 'sub-nav'
        },
        {
          title: '5G core',
          path: '/linux-provisioning',
          icon: <MdNetworkCell style={iconColor} />,
          cName: 'sub-nav'
        },
        {
          title: 'IOT',
          icon: <SiSmartthings style={iconColor} />
        }
      ]
    },
    {
      section: 'Scheduling'
    },
    {
      title: 'Scheduling',
      icon: <RiCalendarScheduleFill style={iconColor} />,
      iconClosed: <RiIcons.RiArrowDownSFill style={iconColor} />,
      iconOpened: <RiIcons.RiArrowUpSFill style={iconColor} />,
      subNav: [
        {
          title: 'Auto Scheduling',
          path: '/time-schedule',
          icon: <CiTimer style={iconColor} />,
          cName: 'sub-nav'
        },
        {
          title: 'Auto Update List',
          path: '/auto-update',
          icon: <MdChecklist style={iconColor} />,
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
      icon: <IoSettings style={iconColor} />
    },
    {
      title: 'Fault Logs',
      path: `http://${BaseUrl}:3000/#!/faults`,
      icon: <MdOutlineDisabledByDefault style={iconColor} />
    },
    {
      title: 'History',
      path: '/history',
      icon: <LiaHistorySolid style={iconColor} />
    },
    {
      section: 'Logout'
    },
    {
      title: 'Logout',
      onClick: logOutCall,
      icon: <IoLogOutOutline style={iconColor} />
    }
  ];

  return SidebarData;
};

export default SidebarDataPage;
