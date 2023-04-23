# ![image](https://user-images.githubusercontent.com/68603272/233815850-182dcaab-b8c3-4d47-b4a4-fc8c3e24973b.png)

### *Your prescriptions, your ownership, your safety*

safeRx is a de-centralized application ⚡️ that aims to end prescription fraud by making access to medication **100% trust-less**, <br />
while simplifying the medication process for doctors 🧑‍⚕️, patients 😷, and pharmacists 👨‍⚕️.

## How does it work? 🤔

safeRx makes prescriptions and collecting medication **simple.** <br />
- We turn prescriptions into fractional NFTs (Non-fungible tokens) that are 100% secure 💯 <br />
- Patients only need to share their safeRx QR code with doctors, who mint the NFT 🔒 <br />
- They can then transfer the amount of medication they need to any Pharmacist, in order to collect medication 💊 <br/>
- When a pharmacist receives a record of medication being transferred, they can be sure that the prescription is legitimate ✅

## Under-the-hood 🥷

- At a higher-level, safeRx uses [`ERC-721 tokens`](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) to represent prescriptions, which contain [`ERC-20 tokens`](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) that represent units of medication.
- When a patient wants to redeem `'n'` units of medication, they are basically burning `'n'` `ERC-20 tokens` (or medication tokens) in their wallet 👜.
- (*Future Ticket*) Information is encrypted when added to the NFTs so that patient's information is undisclosed and kept private 😌

## Try it out yourself! 💃🏽

Feel free to try out our app at [our website, www.saferx.vercel.app](https://www.saferx.vercel.app)

- With a friend acting as the doctor/patient, you can open an account in seconds as a patient/doctor
- Try minting medications for the patient!
- You can redeem the medication against this **dummy pharmacist wallet address** for testing: 
```
0x525528cA1577817A4aF4a8fF39c2413EDA3D5948
```

## Future Plans 📈

- Verified list of doctors and patients
  - Working together with the healthcare industry to form an approved list of pharmacists and doctors
- safeRx will build its data analytics tools
  - We have unprecedented access to invaluable insights into medication control, drug interactions, and patient behaviors
  - This data can be analysed and used to improve patient-care, optimize health costs, and ultimately benefit patients.
