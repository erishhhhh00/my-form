import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AttendanceSheet: React.FC = () => {
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    clientName: '',
    trainingLocation: '',
    trainingCircle: '',
    trainingCoordinator: '',
    ssiplTrainer: '',
    uid: '',
    attendees: Array(10).fill(null).map(() => ({
      learnerName: '',
      companyName: '',
      designation: '',
      employeeId: '',
      phoneNumber: '',
      email: '',
      govtId: '',
      emergencyContact: ''
    }))
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAttendeeChange = (index: number, field: string, value: string) => {
    const updatedAttendees = [...formData.attendees];
    updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
    setFormData(prev => ({ ...prev, attendees: updatedAttendees }));
  };

  return (
    <div className="w-full max-w-full mx-auto p-2 sm:p-4 space-y-4">
      <Card className="border-2 border-form-border bg-card p-4">
        <div className="form-content" style={{ fontSize: '12px', lineHeight: '1.4' }}>
          {/* Header */}
          <div className="border-2 border-black mb-4">
            <div className="flex items-start justify-between p-3">
              <div className="flex-1">
                <h1 className="font-bold text-lg mb-2">
                  Rescue, Inspection, Safety, Elevation – Quality (RISE-Q) : ATTENDANCE SHEET
                </h1>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Date of Training: From:</span>
                    <Input
                      type="date"
                      value={formData.dateFrom}
                      onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                      className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">To:</span>
                    <Input
                      type="date"
                      value={formData.dateTo}
                      onChange={(e) => handleInputChange('dateTo', e.target.value)}
                      className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Name of Client:</span>
                    <Input
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Location of Training:</span>
                    <Input
                      value={formData.trainingLocation}
                      onChange={(e) => handleInputChange('trainingLocation', e.target.value)}
                      className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <span className="font-semibold">Circle of Training:</span>
                    <Input
                      value={formData.trainingCircle}
                      onChange={(e) => handleInputChange('trainingCircle', e.target.value)}
                      className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="ml-4">
                <img 
                  src="/images/logo.png" 
                  alt="SSIPL Logo" 
                  className="object-contain"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            </div>

            {/* Declaration Text */}
            <div className="border-t-2 border-black p-3 space-y-2 text-xs">
              <p>
                <span className="font-semibold">I, the undersigned, hereby declare that I am medically and physically fit to perform all the exercises & activities at height included in tower climbing during the RISE-Q course.</span>
              </p>
              <p>
                I shall perform all the exercises & activities as per instructions given by the trainer & within the safety parameters specified by the trainer.
              </p>
              <p>
                I declare that that in case of any untoward incident or <span className="text-red-600 font-semibold">injury</span> on site or on tower during the training, the consequences of the same shall be solely my responsibility and I will not hold trainer/co trainer/ SSIPL or equipment liable for any damages or injury.
              </p>
            </div>
          </div>

          {/* Day 1 Section */}
          <div className="mb-4">
            <h2 className="text-center font-bold text-lg mb-3 bg-gray-100 py-2 border border-black">
              Day 1
            </h2>

            <div className="overflow-x-auto">
              <Table className="border-2 border-black w-full text-xs">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="border border-black text-center font-bold w-12">Sr. No.</TableHead>
                    <TableHead className="border border-black text-center font-bold w-40">Learner Name</TableHead>
                    <TableHead className="border border-black text-center font-bold w-40">Company Name</TableHead>
                    <TableHead className="border border-black text-center font-bold w-32">Designation</TableHead>
                    <TableHead className="border border-black text-center font-bold w-28">Employee ID</TableHead>
                    <TableHead className="border border-black text-center font-bold w-32">Phone Number</TableHead>
                    <TableHead className="border border-black text-center font-bold w-40">Email</TableHead>
                    <TableHead className="border border-black text-center font-bold w-28">Govt ID</TableHead>
                    <TableHead className="border border-black text-center font-bold w-32">Emergency Contact</TableHead>
                    <TableHead className="border border-black text-center font-bold w-24">Signature</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.attendees.map((attendee, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-black text-center py-2">{index + 1}</TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.learnerName}
                          onChange={(e) => handleAttendeeChange(index, 'learnerName', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.companyName}
                          onChange={(e) => handleAttendeeChange(index, 'companyName', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.designation}
                          onChange={(e) => handleAttendeeChange(index, 'designation', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.employeeId}
                          onChange={(e) => handleAttendeeChange(index, 'employeeId', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.phoneNumber}
                          onChange={(e) => handleAttendeeChange(index, 'phoneNumber', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.email}
                          onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.govtId}
                          onChange={(e) => handleAttendeeChange(index, 'govtId', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <Input
                          value={attendee.emergencyContact}
                          onChange={(e) => handleAttendeeChange(index, 'emergencyContact', e.target.value)}
                          className="border-0 bg-transparent text-xs w-full text-center"
                        />
                      </TableCell>
                      <TableCell className="border border-black p-1">
                        <div className="h-10"></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Footer with Signatures */}
          <div className="grid grid-cols-3 gap-8 mt-6 mb-4 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Name of Training Coordinator:</span>
                <Input
                  value={formData.trainingCoordinator}
                  onChange={(e) => handleInputChange('trainingCoordinator', e.target.value)}
                  className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                />
              </div>
              <div className="mt-8">
                <p className="font-semibold mb-2">Signature</p>
                <div className="border-b border-black w-full h-12"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Name of SSIPL Trainer:</span>
                <Input
                  value={formData.ssiplTrainer}
                  onChange={(e) => handleInputChange('ssiplTrainer', e.target.value)}
                  className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                />
              </div>
              <div className="mt-8">
                <p className="font-semibold mb-2">Signature</p>
                <div className="border-b border-black w-full h-12"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">UID:</span>
                <Input
                  value={formData.uid}
                  onChange={(e) => handleInputChange('uid', e.target.value)}
                  className="border-0 border-b border-black rounded-none bg-transparent text-xs flex-1"
                />
              </div>
            </div>
          </div>

          {/* Footer Page Number */}
          <div className="text-right mt-4">
            <p className="text-xs">1 | P a g e</p>
            <p className="text-xs font-semibold mt-1">FARM-ToCliATS-V00</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceSheet;
