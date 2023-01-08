# These are the added fields and mappings
##Model IPAM-Address
###  added on 2023-01-08

mode        name                    label                   type        weight      mapping
existing    address                 ipaddress 
existing    dns_name  dns-name      DNS Name


new         participant             Company Name            Text        100         registeredName

new         network_name            Network Name            Text        120         network-name

new         asn                     ASN                     Text        104         autsys

new         Link                    Link                    url         105         IXPM-Link

new         network_vlan            Vlan Name               Text        120         vlan-name

new         vlan_number             Vlan Number             Text        131         number

new         private                 Private VLAN            Logical     132         private
new         enabled                 Enabled                 Logical     140         enabled 

new         canping                 Pingable                Logical     141         canping

new         rcmonitored             RC Monitored            Logical     142         monitorrcbgp

new         busyhost                Busy Host               Logical     143         busyhost

new         updated                 Last Modified           Test        999         updated_at
