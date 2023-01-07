SELECT 
    concat(`ixpmanager`.`vlaninterface`.`ipv6hostname`,".ix.",`ixpmanager`.`vlan`.`name`,".Ninja-IX.net"),
    `ixpmanager`.`vlaninterface`.`ipv4canping`,
    concat(`ipv6address`.`address`,"/24"),
    `ixpmanager`.`cust`.`name`,
    `ixpmanager`.`vlan`.`number`
FROM     `ixpmanager`.`vlaninterface`
        JOIN     `ixpmanager`.`ipv6address` ON (`ipv6address`.`id` = `ipv6addressid`)
        JOIN     `ixpmanager`.`vlan` ON (`vlan`.`id` = `vlaninterface`.`vlanid`)
        JOIN     `ixpmanager`.`virtualinterface` ON (`virtualinterface`.`id` = `vlaninterface`.`virtualinterfaceid`)
        JOIN     `ixpmanager`.`cust` ON (`cust`.`id` = `virtualinterface`.`custid`)
WHERE     `ipv6address`.`address` IS NOT NULL and `vlan`.`private` is false
    ORDER BY `ipv6address`.`address`;
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
