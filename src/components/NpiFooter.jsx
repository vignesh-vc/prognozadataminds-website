import React from "react";
import { Phone, Mail, ShieldAlert } from "lucide-react";

const NpiFooter = () => {
  return (
    <footer className="w-full bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* NPI Disclaimer Section */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Important Notice</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The information on prognozadataminds.com is provided "AS IS" and is based on publicly available data from the National Plan and Provider Enumeration System (NPPES). This data is shared in accordance with the NPPES Data Dissemination Notice, the Freedom of Information Act (FOIA), and the e-FOIA Amendments.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Note:</span> We do not guarantee the accuracy, completeness, or reliability of any information found on this website. For official NPI data, please contact the U.S. Department of Health and Human Services (HHS) under the FOIA.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Contact NPI Enumerator</h4>
            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="tel:8004653203" 
                className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">(800) 465-3203</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=P.O.+Box+6059,+Fargo,+ND+58108" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">P.O. Box 6059, Fargo, ND 58108</span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default NpiFooter;
