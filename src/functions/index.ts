const querys: any[] = [
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
	{
		key: 'comerRif',
		query: 'c.comerRif AS [CEDULA-RIF]',
	},
];

/* sql */ `
select *

from (
    SELECT c.comerRif AS [CEDULA-RIF],

    c.comerDesc AS COMERCIO, 

    c.comerDireccion AS DIRECCION,

    a.aboTerminal AS TERMINAL, 

    a.hisFechaEjecucion AS FechaEjec, 

    a.hisFechaProceso AS FechaPreceso, 

    c.comerCod as [COD_COMERCIO],

    c.comerCuentaBanco as [N_CUENTA] ,

    a.aboCodAfi as [N_AFILIADO],

    SUM(a.Monto_Neto) AS [MONTO_NETO], 

    (SUM(a.monto_bruto_tdc) + SUM(a.monto_bruto_tdd)) AS [MONTO_BRUTO],

    a.monto_bruto_tdd as [MONTO_BRUTO_TDD],

    a.monto_bruto_tdc as [MONTO_BRUTO_TDC],

    a.comision_mantenimiento as [COMISION_MANTENIMIENTO],

    

    SUM(a.monto_abono) AS [MONTO_ABONAR],

    

    f.hisTasaBCV AS [TASA]

 

 

 

 

FROM

       (SELECT 

              hisFechaEjecucion,

              hisFechaProceso,

             aboTerminal,

              aboCodAfi,

             (SUM(hisAmountTDD) + SUM(hisAmountTDC)) AS Monto_Neto, ---TARJETA DE CREDITO + TARJETA DE DEBITO

              (SUM(hisAmountTDD) + SUM(hisAmountComisionBanco) - SUM(hisAmountTDCImpuesto)) as monto_bruto_tdd, --Monto Bruto TDD

              (SUM(hisAmountTDC) + SUM(hisAmountTDCImpuesto)) as monto_bruto_tdc, --Monto Bruto TDC

              (SUM(hisIvaSobreMantenimiento) + SUM(hisComisionMantenimiento) + SUM(hisComisionBancaria)) as comision_mantenimiento,--Comision de Mantenimiento

              SUM(hisComisionMantenimiento) AS comision_servicio, -- COMISION DE SERVISIO es Base Imponible

              SUM(hisAmountComisionBanco) AS comision_banco, -- COMISION BANCARIA

              SUM(hisNetoComisionBancaria) AS monto_por_comision, -- COBRO POR COMISION BANCARIA 1,50%

              SUM(hisIvaSobreMantenimiento) AS monto_por_servicio, -- COMISION POR SERVICIO ($35+iva = $40,60 a tasa BCV)

              (SUM(hisAmountComisionBanco) - SUM(hisAmountTDCImpuesto)) AS monto_comision_tdd,  --CALCULA LA COMISION DE TDD CUANDO HAY CREDITO

              SUM(hisAmountTotal) AS monto_abono  -- SIGUE IGUAL

             

         

FROM    

 

Historico

 

WHERE   hisFechaEjecucion BETWEEN @StartDate AND @EndDate

              GROUP BY hisFechaEjecucion, aboTerminal,hisFechaProceso,aboCodAfi) AS a INNER JOIN

Abonos AS b ON a.aboTerminal = b.aboTerminal INNER JOIN

Comercios AS c ON b.aboCodComercio = c.comerCod LEFT OUTER JOIN

Aliados AS d ON c.comerCodAliado = d.id LEFT OUTER JOIN

Bancos AS e ON SUBSTRING(b.aboNroCuenta, 1, 4) = e.banCodBan LEFT OUTER JOIN

LoteCerradoDetalle AS f ON a.hisFechaEjecucion = f.hisFechaEjecucion and a.aboTerminal = f.aboTerminal INNER JOIN

group by c.comerRif, c.comerDesc, c.comerDireccion, a.aboTerminal, a.hisFechaEjecucion, d.aliIdentificacion,d.aliNombres, d.aliApellidos,c.comerCod,c.comerCuentaBanco,

a.monto_bruto_tdd,a.monto_bruto_tdC,a.comision_mantenimiento,a.aboCodAfi,a.hisFechaProceso,f.hisTasaBCV

) as c order by c.MONTO_NETO desc

 
`;

const QueryDB = (keys: string[]) => {
	const quert: any = querys.filter((item: any) => keys.includes(item.key)).map((item: any) => {});
};

export default QueryDB;
