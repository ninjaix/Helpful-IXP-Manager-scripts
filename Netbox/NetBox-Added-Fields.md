# These are the added fields and mappings
##Model IPAM-Address
###  added on 2023-01-08

mode        name                    label                   type        weight      mapping
existing    address                 ipaddress  <br />
existing    dns_name  dns-name      DNS Name <br />
 <br />
new         participant             Company Name            Text        100         registeredName <br />
new         network_name            Network Name            Text        120         network-name <br />
new         asn                     ASN                     Text        104         autsys <br />
new         Link                    Link                    url         105         IXPM-Link <br />
new         network_vlan            Vlan Name               Text        120         vlan-name <br />
new         vlan_number             Vlan Number             Text        131         number <br />
new         private                 Private VLAN            Logical     132         private <br />
new         enabled                 Enabled                 Logical     140         enabled  <br />
new         canping                 Pingable                Logical     141         canping <br />
new         rcmonitored             RC Monitored            Logical     142         monitorrcbgp <br />
new         busyhost                Busy Host               Logical     143         busyhost <br />
new         updated                 Last Modified           Test        999         updated_at <br />
