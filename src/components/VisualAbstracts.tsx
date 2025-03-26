import React from 'react';

export function VisualAbstracts() {
  const abstracts = [
    {
      id: 1,
      title: "Predictors of 30-Day Mortality After Major Lower Extremity Amputation",
      author: "Jolissaint et al.",
      date: "December 2019",
      imagePath: "/visualabstracts/Screenshot 2024-12-03 at 5.30.40 PM.png"
    },
    {
      id: 2,
      title: "Survival After Endovascular (EVAR) And Open Repair (OSR)",
      author: "Carbonneau et al.",
      date: "December 2019",
      imagePath: "/visualabstracts/Screenshot 2024-12-03 at 5.34.48 PM.png"
    },
    {
      id: 3,
      title: "Upper Extremity Arterial Endovascular Interventions",
      author: "Cheun et al.",
      date: "December 2019",
      imagePath: "/visualabstracts/Screenshot 2024-12-03 at 5.35.30 PM.png"
    },
    {
      id: 4,
      title: "Endovascular Treatment Of Spontaneous Renal Artery Dissection",
      author: "Jiang et al.",
      date: "December 2019",
      imagePath: "/visualabstracts/Screenshot 2024-12-03 at 5.35.44 PM.png"
    },
    {
      id: 5,
      title: "Benefit Of Multidisciplinary Wound Care Center",
      author: "Flores et al.",
      date: "November 2019",
      imagePath: "/visualabstracts/Screenshot 2024-12-03 at 5.30.40 PM.png"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {abstracts.map((abstract) => (
        <div key={abstract.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={abstract.imagePath} 
            alt={abstract.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-rose-800 mb-2">{abstract.title}</h3>
            <div className="text-sm text-gray-600">
              <p>{abstract.author}</p>
              <p>{abstract.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}