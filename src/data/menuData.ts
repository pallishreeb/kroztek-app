/** @format */
import { MenuSection } from "@/types/navbar";
import accessControl from "@/assets/icons/acces_control.png";
import audioVisual from "@/assets/icons/audio_visual.png";
import conferenceRoom from "@/assets/icons/conference_room.png";
import dataCenter from "@/assets/icons/data_center.png";
import networks from "@/assets/icons/networks.png";
import intercom from "@/assets/icons/intercom.png";
import securityAlarm from "@/assets/icons/security_alarm.png";
import structuredCabling from "@/assets/icons/structured_cabling.png";
import surveillanceCamera from "@/assets/icons/surveillance_camera.png";
// Menu data
export const menuData = {
  services: [
    {
      name: "Access Control Systems",
      url: "/services/access-control",
      icon: accessControl,
    },
    {
      name: "Audio / Visual Systems",
      url: "/services/audio-visual",
      icon: audioVisual,
    },
    {
      name: "Conference Room Solutions",
      url: "/services/conference-room",
      icon: conferenceRoom,
    },
    {
      name: "Data Center Infrastructure",
      url: "/services/data-center",
      icon: dataCenter,
    },
    {
      name: "Networks & IT Infrastructure",
      url: "/services/networks-it",
      icon: networks,
    },
    {
      name: "Multifamily Intercom Systems",
      url: "/services/intercom",
      icon: intercom,
    },
    {
      name: "Security Alarm Systems",
      url: "/services/security-alarm",
      icon: securityAlarm,
    },
    {
      name: "Structured Cabling",
      url: "/services/structured-cabling",
      icon: structuredCabling,
    },
    {
      name: "Surveillance Camera Systems",
      url: "/services/surveillance-camera",
      icon: surveillanceCamera,
    },
    {
      name: "E-Rate Program",
      url: "/services/e-rate-program",
    },
  ],
  caseStudies: [
    {
      name: "Burns - A Lasting Partnership",
      url: "/case-studies/burns-partnership",
    },
    {
      name: "Cloud + 4-Wire Intercoms",
      url: "/case-studies/cloud-4-wire-intercoms",
    },
    {
      name: "Custom Audio Deterrent",
      url: "/case-studies/custom-audio-deterrent",
    },
    {
      name: "Eliminated Unauthorized Access",
      url: "/case-studies/eliminated-unauthorized-access",
    },
    {
      name: "Enterprise Cabling Cleanup",
      url: "/case-studies/enterprise-cabling-cleanup",
    },
    {
      name: "Fixing Failed Installs",
      url: "/case-studies/fixing-failed-installs",
    },
    { name: "Kisi Elevator Access", url: "/case-studies/kisi-elevator-access" },
    { name: "Phased Wi-Fi Upgrade", url: "/case-studies/phased-wifi-upgrade" },
    {
      name: "PPA - A Lasting Partnership",
      url: "/case-studies/ppa-partnership",
    },
    {
      name: "Scaling Security w/ Fairstead",
      url: "/case-studies/scaling-security-fairstead",
    },
    {
      name: "Securing Lauderhill Point",
      url: "/case-studies/securing-lauderhill-point",
    },
    {
      name: "Smarter Training Room",
      url: "/case-studies/smarter-training-room",
    },
    {
      name: "Unified Intercom Access",
      url: "/case-studies/unified-intercom-access",
    },
  ],
  spotlightManfacturers: [
    { name: "Akuvox", url: "/partners/akuvox" },
    { name: "Alphatouch", url: "/partners/alphatouch" },
    { name: "ButterflyMX", url: "/partners/butterflymx" },
    { name: "Cisco / Meraki", url: "/partners/cisco-meraki" },
    { name: "Eagle Eye", url: "/partners/eagle-eye" },
    { name: "Kisi", url: "/partners/kisi" },
    { name: "Lencore", url: "/partners/lencore" },
    { name: "MVI", url: "/partners/mvi" },
    { name: "Rhombus", url: "/partners/rhombus" },
    { name: "Speco Technologies", url: "/partners/speco-technologies" },
    { name: "Teleportivity", url: "/partners/teleportivity" },
    { name: "Verkada", url: "/partners/verkada" },
    { name: "Vicon", url: "/partners/vicon" },
    { name: "Vivotek / Vortex", url: "/partners/vivotek-vortex" },
    { name: "ZK Teco", url: "/partners/zk-teco" },
  ],
};
export const MENU_SECTIONS: MenuSection[] = [
  {
    key: "services",
    title: "Services",
    rootUrl: "/services",
    items: [
      {
        name: "Access Control Systems",
        url: "/services/access-control",
        icon: accessControl,
      },
      {
        name: "Audio / Visual Systems",
        url: "/services/audio-visual",
        icon: audioVisual,
      },
      {
        name: "Conference Room Solutions",
        url: "/services/conference-room",
        icon: conferenceRoom,
      },
      {
        name: "Data Center Infrastructure",
        url: "/services/data-center",
        icon: dataCenter,
      },
      {
        name: "Networks & IT Infrastructure",
        url: "/services/networks-it",
        icon: networks,
      },
      {
        name: "Multifamily Intercom Systems",
        url: "/services/intercom",
        icon: intercom,
      },
      {
        name: "Security Alarm Systems",
        url: "/services/security-alarm",
        icon: securityAlarm,
      },
      {
        name: "Structured Cabling",
        url: "/services/structured-cabling",
        icon: structuredCabling,
      },
      {
        name: "Surveillance Camera Systems",
        url: "/services/surveillance-camera",
        icon: surveillanceCamera,
      },
      {
        name: "E-Rate Program",
        url: "/services/e-rate-program",
      },
    ],
  },
  {
    key: "caseStudies",
    title: "Case Studies",
    rootUrl: "/case-studies",
    items: [
      {
        name: "Burns - A Lasting Partnership",
        url: "/case-studies/burns-partnership",
      },
      {
        name: "Cloud + 4-Wire Intercoms",
        url: "/case-studies/cloud-4-wire-intercoms",
      },
      {
        name: "Custom Audio Deterrent",
        url: "/case-studies/custom-audio-deterrent",
      },
      {
        name: "Eliminated Unauthorized Access",
        url: "/case-studies/eliminated-unauthorized-access",
      },
      {
        name: "Enterprise Cabling Cleanup",
        url: "/case-studies/enterprise-cabling-cleanup",
      },
      {
        name: "Fixing Failed Installs",
        url: "/case-studies/fixing-failed-installs",
      },
      {
        name: "Kisi Elevator Access",
        url: "/case-studies/kisi-elevator-access",
      },
      {
        name: "Phased Wi-Fi Upgrade",
        url: "/case-studies/phased-wifi-upgrade",
      },
      {
        name: "PPA - A Lasting Partnership",
        url: "/case-studies/ppa-partnership",
      },
      {
        name: "Scaling Security w/ Fairstead",
        url: "/case-studies/scaling-security-fairstead",
      },
      {
        name: "Securing Lauderhill Point",
        url: "/case-studies/securing-lauderhill-point",
      },
      {
        name: "Smarter Training Room",
        url: "/case-studies/smarter-training-room",
      },
      {
        name: "Unified Intercom Access",
        url: "/case-studies/unified-intercom-access",
      },
    ],
  },
  {
    key: "spotlightManfacturers",
    title: "Spotlight Manufacturers",
    rootUrl: "/partners",
    items: [
      { name: "Akuvox", url: "/partners/akuvox" },
      { name: "Alphatouch", url: "/partners/alphatouch" },
      { name: "ButterflyMX", url: "/partners/butterflymx" },
      { name: "Cisco / Meraki", url: "/partners/cisco-meraki" },
      { name: "Eagle Eye", url: "/partners/eagle-eye" },
      { name: "Kisi", url: "/partners/kisi" },
      { name: "Lencore", url: "/partners/lencore" },
      { name: "MVI", url: "/partners/mvi" },
      { name: "Rhombus", url: "/partners/rhombus" },
      { name: "Speco Technologies", url: "/partners/speco-technologies" },
      { name: "Teleportivity", url: "/partners/teleportivity" },
      { name: "Verkada", url: "/partners/verkada" },
      { name: "Vicon", url: "/partners/vicon" },
      { name: "Vivotek / Vortex", url: "/partners/vivotek-vortex" },
      { name: "ZK Teco", url: "/partners/zk-teco" },
    ],
  },
];
// Function to convert camelCase keys to kebab-case URLs
export const getRouteUrl = (key: string) => {
  const routeMap: { [key: string]: string } = {
    services: "/services",
    caseStudies: "/case-studies",
    spotlightManfacturers: "/partners",
  };
  return routeMap[key] || `/${key}`;
};
