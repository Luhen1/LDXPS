CREATE TABLE TB_VENDEDORES(
	CDVEND VARCHAR(36) NOT NULL PRIMARY KEY,
    DSNOME VARCHAR(50) NOT NULL,
	CDTAB INTEGER NOT NULL,
    DTNASC DATE
);

CREATE TABLE TB_CLIENTES(
	CDCL VARCHAR(36) NOT NULL PRIMARY KEY,
    DSNOME VARCHAR(50) NOT NULL,
    IDTIPO CHAR(2) NOT NULL DEFAULT 'PF' CHECK (IDTIPO='PF' OR IDTIPO='PJ'),
    CDVEND VARCHAR(36),
    DSLIM DECIMAL(15,2),
    FOREIGN KEY (CDVEND) REFERENCES TB_VENDEDORES(CDVEND)
);