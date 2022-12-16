SELECT asn FROM peeringdb.peeringdb_network where `peeringdb_network`.`info_never_via_route_servers` =true
order by asn
INTO OUTFILE '/var/lib/mysql-files/never-via-rs.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
