export const GenderOptions = ["Male", "Female"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
    {
      value: "john_green",
      label: "Dr. John Green",
      image: "/assets/images/dr-green.png",
    },
    {
      value: "leila_cameron",
      label: "Dr. Leila Cameron",
      image: "/assets/images/dr-cameron.png",
    },
    {
      value: "david_livingston",
      label: "Dr. David Livingston",
      image: "/assets/images/dr-livingston.png",
    },
    {
      value: "evan_peter",
      label: "Dr. Evan Peter",
      image: "/assets/images/dr-peter.png",
    },
    {
      value: "jane_powell",
      label: "Dr. Jane Powell",
      image: "/assets/images/dr-powell.png",
    },
    {
      value: "alex_ramirez",
      label: "Dr. Alex Ramirez",
      image: "/assets/images/dr-remirez.png",
    },
    {
      value: "jasmine_lee",
      label: "Dr. Jasmine Lee",
      image: "/assets/images/dr-lee.png",
    },
    {
      value: "alyana_cruz",
      label: "Dr. Alyana Cruz",
      image: "/assets/images/dr-cruz.png",
    },
    {
      value: "hardik_sharma",
      label: "Dr. Hardik Sharma",
      image: "/assets/images/dr-sharma.png",
    },
  ];

export const StatusIcon = {
  Scheduled: "/assets/icons/check.svg",
  Pending: "/assets/icons/pending.svg",
  Cancelled: "/assets/icons/cancelled.svg",
};