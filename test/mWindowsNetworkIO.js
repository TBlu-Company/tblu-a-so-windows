'use strict';
const Datastore = require('nedb');
const path = require('path');
const dirname = path.dirname(__filename);
const dBconfig = new Datastore(dirname + '/config.db');
dBconfig.loadDatabase();
const core = require('../index.js');

describe('mWindowsNetworkIO', function() {
  it('get mWindowsNetworkIO', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsNetworkIO";
    core.run(data).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});



// wmic NIC get / format: value
// AdapterType = Ethernet 802.3
// // Interface de rede?
// AdapterTypeId = 0
// AutoSense =
//   Availability = 3
// Caption = [00000004] AWS PV Network Device
// ConfigManagerErrorCode = 0
// ConfigManagerUserConfig = FALSE
// CreationClassName = Win32_NetworkAdapter
// Description = AWS PV Network Device
// DeviceID = 4
// ErrorCleared =
//   ErrorDescription =
//   GUID = {
//     419 F25B1 - 40 DF - 49 AD - B36D - 2 C5601117C45
//   }
// Index = 4
// InstallDate =
//   Installed = TRUE
// InterfaceIndex = 3
// LastErrorCode =
//   MACAddress = 02: 88: 86: F2: 6 B: 76
// Manufacturer = Amazon Inc.
// MaxNumberControlled = 0
// MaxSpeed =
//   Name = AWS PV Network Device #0
//
// NetConnectionID= Ethernet 2
// NetConnectionStatus = 2
// NetEnabled = TRUE
// NetworkAddresses =
//   PermanentAddress =
//   PhysicalAdapter = TRUE
// PNPDeviceID = XENVIF\ VEN_XS0001 & amp;
// DEV_NET & amp;
// REV_00000000\ 0
// PowerManagementCapabilities =
//   PowerManagementSupported = FALSE
// ProductName = AWS PV Network Device
// ServiceName = xennet
// Speed = 1000000000
// Status =
//   StatusInfo =
//   SystemCreationClassName = Win32_ComputerSystem
// SystemName = EC2AMAZ - 1 NRLJNM
// TimeOfLastReset = 20170413205954.492123 + 000
//
//
//
//
//
// ArpAlwaysSourceRoute =
//   ArpUseEtherSNAP =
//   Caption = [00000004] AWS PV Network Device
// DatabasePath = % SystemRoot % \System32\ drivers\ etc
// DeadGWDetectEnabled =
//   DefaultIPGateway = {
//     "172.31.64.1"
//   }
// DefaultTOS =
//   DefaultTTL =
//   Description = AWS PV Network Device #0
//
// DHCPEnabled= TRUE
// DHCPLeaseExpires = 20170421183041.000000 + 000
// DHCPLeaseObtained = 20170421173041.000000 + 000
// DHCPServer = 172.31 .64 .1
// DNSDomain = ec2.internal
// DNSDomainSuffixSearchOrder = {
//   "us-east-1.ec2-utilities.amazonaws.com",
//   "ec2.internal"
// }
// DNSEnabledForWINSResolution = FALSE
// DNSHostName = EC2AMAZ - 1 NRLJNM
// DNSServerSearchOrder = {
//   "172.31.0.2"
// }
// DomainDNSRegistrationEnabled = FALSE
// ForwardBufferMemory =
//   FullDNSRegistrationEnabled = TRUE
// GatewayCostMetric = {
//   0
// }
// IGMPLevel =
//   Index = 4
// InterfaceIndex = 3
// IPAddress = {
//   "172.31.75.226",
//   "fe80::58e8:1e34:a617:469b"
// }
// IPConnectionMetric = 25
// IPEnabled = TRUE
// IPFilterSecurityEnabled = FALSE
// IPPortSecurityEnabled =
//   IPSecPermitIPProtocols = {}
// IPSecPermitTCPPorts = {}
// IPSecPermitUDPPorts = {}
// IPSubnet = {
//   "255.255.240.0",
//   "64"
// }
// IPUseZeroBroadcast =
//   IPXAddress =
//   IPXEnabled =
//   IPXFrameType =
//   IPXMediaType =
//   IPXNetworkNumber =
//   IPXVirtualNetNumber =
//   KeepAliveInterval =
//   KeepAliveTime =
//   MACAddress = 02: 88: 86: F2: 6 B: 76
// MTU =
//   NumForwardPackets =
//   PMTUBHDetectEnabled =
//   PMTUDiscoveryEnabled =
//   ServiceName = xennet
// SettingID = {
//   419 F25B1 - 40 DF - 49 AD - B36D - 2 C5601117C45
// }
// TcpipNetbiosOptions = 0
// TcpMaxConnectRetransmissions =
//   TcpMaxDataRetransmissions =
//   TcpNumConnections =
//   TcpUseRFC1122UrgentPointer =
//   TcpWindowSize =
//   WINSEnableLMHostsLookup = TRUE
// WINSHostLookupFile =
//   WINSPrimaryServer =
//   WINSScopeID =
//   WINSSecondaryServer =
