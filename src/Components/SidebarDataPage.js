import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { FaServer, FaAddressCard } from 'react-icons/fa6';
import { MdNetworkCell, MdChecklist, MdFileUpload } from 'react-icons/md';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { CiTimer } from 'react-icons/ci';
import { IoSettings, IoLogOutOutline } from 'react-icons/io5';
import { BsTelephoneFill } from 'react-icons/bs';
import { LiaHistorySolid } from 'react-icons/lia';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { SiServerfault } from "react-icons/si";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const SidebarDataPage = () => {
 
  const navigate = useNavigate();

  const logOutCall = async () => {
    Cookies.remove(CookieName); 
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate("/");
  };

  const iconColor = { color: '#9cf2ff' };

  const SidebarData = [
    {
      title: 'Dashboard',
      path: '/home',
      onClick: '',
      icon: <AiIcons.AiFillHome style={iconColor} />
    },
    {
      title: <span style={{ fontSize: '14px' }}>Device Detail</span>,
      icon: <BsTelephoneFill style={iconColor} />,
      iconClosed: <RiIcons.RiArrowDownSFill style={iconColor} />,
      iconOpened: <RiIcons.RiArrowUpSFill style={iconColor} />,
      subNav: [
        {
          title: 'Online Devices',
          path: "/online-devices",
          icon: <BsTelephoneFill style={iconColor} />
        },
        {
          title: 'Listing Device',
          path: '/listing-devices',
          icon: <AiOutlineOrderedList style={iconColor} />
        },
        {
          title: 'Listing file',
          path: '/fileUploadList',
          icon: <MdFileUpload style={iconColor} />
        }
      ]
    },
    {
      section: 'Device Management'
    },
    {
      title: <span style={{ fontSize: '14px' }}>Provision IP phone</span>,
      icon: <AiIcons.AiFillPhone style={iconColor} />,
      iconClosed: <RiIcons.RiArrowDownSFill style={iconColor} />,
      iconOpened: <RiIcons.RiArrowUpSFill style={iconColor} />,
      subNav: [
        {
          title: 'Coral IP Phones',
          path: '/Ip-Phone-Provisioning',
          icon: <IoIcons.IoIosPaper style={iconColor} />
        },
        {
          title: 'Backup config',
          path: '/Backup_config',
          icon: <IoIcons.IoIosPaper style={iconColor} />
        },
        {
          title: 'Cisco CP-3905',
          path: '/cisco_CP-3905',
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
          title: '5G core',
          path: '/linux-provisioning',
          icon: <MdNetworkCell style={iconColor} />,
          cName: 'sub-nav'
        },
        {
          title: 'Call Server',
          path: '/call-server',
          icon: <FaServer style={iconColor} />,
          cName: 'sub-nav'
        },
        {
          title: 'Add IPAddress to server',
          path: '/add-IPAddress',
          icon: <FaAddressCard style={iconColor} />,
          cName: 'sub-nav'
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
      title: 'Fault',
      path: '/faults',
      icon: <SiServerfault style={iconColor} />
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
