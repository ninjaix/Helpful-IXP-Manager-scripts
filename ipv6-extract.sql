SELECT `ipv6hostname`,`ipv6canping`,`address`,`name` FROM `ixpmanager`.`vlaninterface` 
JOIN `ixpmanager`.`ipv6address` 
ON (`ipv6address`.`id`= `ipv6addressid`) 
JOIN `ixpmanager`.`vlan` 
ON  `vlan`.`id`=`vlaninterface`.`vlanid` where `ipv6canping` is true and `address`is Not null
INTO OUTFILE '/var/lib/mysql-files/ipv6-dns.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
