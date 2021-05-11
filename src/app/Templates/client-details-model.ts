export class ClientDetails{
    constructor(   
    public clientName:String,
	public description:String ,
	public address:String,
	public gstin:String,
	public phone:String,
	public bankName:String,
	public bankBranch:String,
	public bankAccNo:String,
	public bankIFSC:String,
	public ghsn:String,
	public shsn:String,
	public sgst:number,
	public cgst:number,
	public igst:number
    ){}
}