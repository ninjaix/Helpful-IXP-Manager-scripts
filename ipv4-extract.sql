SELECT 
    concat(`ixpmanager`.`vlaninterface`.`ipv4hostname`,".",`ixpmanager`.`vlan`.`name`,"IX.Ninja-IX.net"),
    `ixpmanager`.`vlaninterface`.`ipv4canping`,
    concat(`ipv4address`.`address`,"/24"),
    `ixpmanager`.`cust`.`name`,
    `ixpmanager`.`vlan`.`number`
FROM
    `ixpmanager`.`vlaninterface`
        JOIN     `ixpmanager`.`ipv4address` ON (`ipv4address`.`id` = `ipv4addressid`)
        JOIN     `ixpmanager`.`vlan` ON (`vlan`.`id` = `vlaninterface`.`vlanid`)
        JOIN     `ixpmanager`.`virtualinterface` ON (`virtualinterface`.`id` = `vlaninterface`.`virtualinterfaceid`)
        JOIN     `ixpmanager`.`cust` ON (`cust`.`id` = `virtualinterface`.`custid`)
WHERE
    `ipv4address`.`address` IS NOT NULL and `vlan`.`private` is false
    ORDER BY `ipv4address`.`address`;
INTO OUTFILE '/var/lib/mysql-files/ipv4-dns.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
