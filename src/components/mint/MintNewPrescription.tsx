import useMedications from "@/hooks/useMedications"
import { IconPill, IconPlus, IconScan, IconSignature, IconTrash, IconX } from "@tabler/icons-react"
import { useState } from "react"
import ScanQRCodeOverlay from "../common/qr/ScanQROverlay"

const emptyMedicineBeingAdded = { name: '', amount: 10, remark: '', dosage: 100 }

export default function MintNewPrescription() {
	const [medicationsToAdd, setMedicationsToAdd] = useState<({name: string, amount:number, remark:string, dosage:number})[]>([])
	const [medicineBeingAdded, setMedicineBeingAdded] = useState<({name: string, amount:number, remark:string, dosage:number}) | null>(null)
	const [patientAddressInput, setPatientAddressInput] = useState<string>('')
	const [isQrScannerOpen, setIsQrScannerOpen] = useState(false)
	const { mint } = useMedications()

	const beginMint = () => {
		mint(patientAddressInput, medicationsToAdd)
			.then(_ => {
				setMedicationsToAdd([])
				setMedicineBeingAdded(emptyMedicineBeingAdded)
				setPatientAddressInput('')
			})
			.catch(e => console.error(e))
	}

	return (
		<div className="flex flex-col max-w-full">
			<div className="flex flex-col gap-8 items-start justify-start max-w-full">
				<div className="text-3xl font-medium">Sign New Prescription</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
					<div className="with-bg-2 rounded-lg with-ring p-6 flex flex-col">
						<div className="flex justify-between items-center">
							<div className="text-lg font-medium">Medications</div>
							<button onClick={() => setMedicineBeingAdded(emptyMedicineBeingAdded)} className="with-bg-3 w-8 h-8 rounded-md with-hover with-transition flex items-center justify-center">
								<IconPlus/>
							</button>
						</div>
						{ medicineBeingAdded && (
							<div className="with-bg-3 with-ring rounded-md px-4 py-8 mt-4 -mx-3 md:mx-0">
								<div className="flex justify-between items-center">
									<div className="">New Medication</div>
									<button onClick={() => setMedicineBeingAdded(null)} className="opacity-50 hover:opacity-70 with-transition"><IconX/></button>
								</div>
								<div className="flex flex-col mt-2 gap-4">
									<div className="flex flex-col gap-2">
										<div className="text-sm opacity-50">Name</div>
										<input value={medicineBeingAdded.name} onChange={e => setMedicineBeingAdded({...medicineBeingAdded, name: e.currentTarget.value})} className="px-3 py-2 rounded-md text-sm w-full with-ring with-bg-2"/>
									</div>
									<div className="flex gap-4 w-full">
										<div className="flex flex-col gap-2 w-full">
											<div className="text-sm opacity-50">Amount</div>
											<input value={medicineBeingAdded.amount} onChange={e => setMedicineBeingAdded({...medicineBeingAdded, amount: parseInt(e.currentTarget.value) || 0})} className="px-3 py-2 rounded-md text-sm w-full with-ring with-bg-2"/>
										</div>
										<div className="flex flex-col gap-2 w-full">
											<div className="text-sm opacity-50">Dosage (mg)</div>
											<input value={medicineBeingAdded.dosage} onChange={e => setMedicineBeingAdded({...medicineBeingAdded, dosage: parseInt(e.currentTarget.value) || 0})} className="px-3 py-2 rounded-md text-sm w-full with-ring with-bg-2"/>
										</div>
									</div>
									<div className="flex flex-col gap-2">
										<div className="text-sm opacity-50">Remarks</div>
										<input value={medicineBeingAdded.remark} onChange={e => setMedicineBeingAdded({...medicineBeingAdded, remark: e.currentTarget.value})} className="px-3 py-2 rounded-md text-sm w-full with-ring with-bg-2"/>
									</div>
								</div>
								<button disabled={!medicineBeingAdded.name.trim().length || medicineBeingAdded.dosage == 0 || medicineBeingAdded.amount == 0} onClick={() => {
									setMedicationsToAdd([...medicationsToAdd, medicineBeingAdded])
									setMedicineBeingAdded(null)
								}} className="bg-violet-500 px-3 py-2 hover:bg-violet-600 with-transition text-slate-100 w-full mt-8 rounded-md text-sm disabled:opacity-40">
									Add to List
								</button>
							</div>
						)}
						<div className={`items-center justify-center p-8 border-dashed border-2 w-full mt-8 rounded-md border-slate-500/40 ${!medicationsToAdd.length && !medicineBeingAdded ? 'flex' : 'hidden'}`}>
							<div className="flex flex-col gap-2 items-center justify-center">
								<IconPill className="opacity-40" size={28}/>
								<div className="max-w-xs text-center text-lg opacity-40 leading-tight">Add some medications to this prescription!</div>
							</div>
						</div>
						<div className="flex flex-col w-full mt-4">
							{medicationsToAdd.map((m, i) => (
								<div key={`${m.name}_${i}`} className="-mx-6 px-6 py-3 with-bg-2 with-hover with-transition">
									<div className="flex justify-between items-center">
										<div className="flex flex-col">
											<div className="">{i + 1}. {m.name} ({m.dosage}mg) x{m.amount}</div>
											<div className="opacity-40 text-sm">Remarks: {m.remark}</div>
										</div>
										<button onClick={() => setMedicationsToAdd(m => m.filter((_, j) => j !== i))} className="w-6 h-6 rounded-md bg-red-500/50 hover:bg-red-500/70 with-transition flex items-center justify-center">
											<IconTrash className="opacity-50" size={15}/>
										</button>
									</div>
								</div>
							))}
						</div>
						
					</div>
					<div className="w-full flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<div className="text-lg">Patient&#39;s Wallet Address</div>
							<button onClick={() => setIsQrScannerOpen(true)}>
								<IconScan/>
							</button>
						</div>
						<input value={patientAddressInput} onChange={e => setPatientAddressInput(e.currentTarget.value)} placeholder="0x.............................." className="with-bg-1 rounded-md w-full px-4 py-2 with-ring with-bg-2"/>
						<button disabled={patientAddressInput === '' || !medicationsToAdd.length} onClick={beginMint} className="bg-violet-500 px-3 disabled:opacity-40 py-2 hover:bg-violet-600 with-transition text-slate-100 w-full mt-4 rounded-md"><div className="flex gap-2 w-full items-center justify-center"><IconSignature size={20}/> Sign & Mint</div></button>
					</div>
				</div>
			</div>
			<ScanQRCodeOverlay key={patientAddressInput} isOpen={isQrScannerOpen} address={patientAddressInput} setAddressInput={setPatientAddressInput} close={() => setIsQrScannerOpen(false)}/>
		</div>
	)
}
