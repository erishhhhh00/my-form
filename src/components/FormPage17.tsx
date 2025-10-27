import React, { useState } from 'react';
import { useForm } from '@/context/FormContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { generateApplicationId } from '@/utils/applicationId';
import { CheckCircle } from 'lucide-react';

const FormPage17: React.FC = () => {
  const { formData, updateFormData, generatePDF } = useForm();
  const { toast } = useToast();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleInputChange = (field: string, value: any) => {
    updateFormData('page17', { [field]: value });
  };

  const handleArrayChange = (index: number, field: string, value: any) => {
    const currentArray = formData.page17.specificOutcomes || [];
    const updatedArray = [...currentArray];
    if (!updatedArray[index]) {
      updatedArray[index] = {};
    }
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    updateFormData('page17', { specificOutcomes: updatedArray });
  };

  const specificOutcomes = [
    { id: 1, text: 'Explain the use of a range of fall arrest equipment and knowledge of applicable regulations regulating fall arrest equipment' },
    { id: 2, text: 'Explain and use basic rope knots' },
    { id: 3, text: 'Install and use fall arrest systems' },
    { id: 4, text: 'Perform pre-use inspection and assemble fall arrest equipment and systems' },
    { id: 5, text: 'Interpret and implement a fall arrest risk assessment' },
    { id: 6, text: 'Perform a basic fall arrest rescue to bring a casualty down to safety' },
    { id: 7, text: 'Select suitable anchor points' },
    { id: 8, text: 'Explain relevant regulations pertaining to Standards and country regulations.' },
    { id: 9, text: 'Demonstrate and explain safe access to various structures' },
    { id: 10, text: 'Conduct rope rigging practices in accordance with the legislative safety Standards and job requirements. This includes the inspection, selection and use of slings and lifting tackle to safely lift tools for up to 20kg' }
  ];

  const handleSend = async () => {
    try {
      // Generate unique application ID
      const applicationId = generateApplicationId();
      
      // Create submission record
      const submissionRecord = {
        id: Date.now().toString(),
        applicationId,
        formData,
        submittedAt: new Date().toISOString(),
        status: 'pending_review' as const,
        learnerName: formData.page1.learnerName,
        companyName: formData.page1.companyName,
      };
      
      // Update form data with application ID
      const finalFormData = {
        ...formData,
        applicationId
      };
      
      // Save to localStorage with updated form data
      const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      const submissionWithUpdatedData = {
        ...submissionRecord,
        formData: finalFormData
      };
      existingSubmissions.push(submissionWithUpdatedData);
      localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));
      
      // Show success dialog
      setSubmissionId(applicationId);
      setShowSuccessDialog(true);
      
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Submit Failed",
        description: "An unexpected error occurred while submitting the form.",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className="w-full max-w-full mx-auto p-1 sm:p-2 md:p-4 space-y-1 sm:space-y-2 md:space-y-4 print:p-2 print:space-y-2">
        <Card className="p-1 sm:p-2 md:p-4 print:p-2 border-2 border-form-border h-full">
        {/* Header */}
        <div className="text-center mb-2 sm:mb-4 print:mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold mr-2">SSIPL</div>
              <div className="text-xl font-bold print:text-lg">Shield Skills Institute</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="Shield Skills Institute Logo" 
              className="object-contain"
              style={{ width: '87px', height: '73px' }}
            />
          </div>
        </div>
        </div>

        <div className="space-y-4 print:space-y-2">
          {/* Section 9: Summative Assessment */}
          <div className="text-lg font-bold mb-4 print:text-base">9. SUMMATIVE ASSESSMENT AND FEEDBACK:</div>
          
          {/* Fall Arrest & Rescue Management Table */}
          <div className="border border-gray-300">
            <div className="bg-gray-100 p-2 font-bold text-sm text-center">
              FALL ARREST & RESCUE MANAGEMENT – TOWER CLIMBER (FARM-TOCLI)
            </div>
            
            {/* Specific Outcomes */}
            <div className="border-b border-gray-300">
              <div className="grid grid-cols-4 gap-0 text-xs font-bold" style={{gridTemplateColumns: '1fr 3fr 60px 60px'}}>
                <div className="border-r border-gray-300 p-2 text-center font-bold text-sm">Specific Outcome 1</div>
                <div className="border-r border-gray-300 p-2 font-normal">Explain the use of a range of fall arrest equipment and knowledge of applicable regulations regulating fall arrest equipment</div>
                <div className="border-r border-gray-300 p-2 text-center">A</div>
                <div className="p-2 text-center">NYA</div>
              </div>
              
              {specificOutcomes.map((outcome, index) => (
                <div key={outcome.id} className="grid grid-cols-4 gap-0 text-xs border-t border-gray-300" style={{gridTemplateColumns: '1fr 3fr 60px 60px'}}>
                  <div className="border-r border-gray-300 p-2 text-center">
                    <span className="font-bold text-sm">Specific Outcome {outcome.id}</span>
                  </div>
                  <div className="border-r border-gray-300 p-2">
                    <span className="text-xs">{outcome.text}</span>
                  </div>
                  <div className="border-r border-gray-300 p-2 flex justify-center items-center">
                    <Checkbox 
                      checked={formData.page17.specificOutcomes?.[index]?.achieved || false}
                      onCheckedChange={(checked) => handleArrayChange(index, 'achieved', checked)}
                    />
                  </div>
                  <div className="p-2 flex justify-center items-center">
                    <Checkbox 
                      checked={formData.page17.specificOutcomes?.[index]?.notAchieved || false}
                      onCheckedChange={(checked) => handleArrayChange(index, 'notAchieved', checked)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Knowledge Questionnaire Results */}
            <div className="border-b border-gray-300 p-2">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-bold">Knowledge Questionnaire Results</div>
                <div className="flex items-center gap-2">
                  <span>A</span>
                  <input 
                    type="radio" 
                    name="knowledgeResults"
                    checked={formData.page17.knowledgeResults === 'achieved'}
                    onChange={() => handleInputChange('knowledgeResults', 'achieved')}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>NYA</span>
                  <input 
                    type="radio" 
                    name="knowledgeResults"
                    checked={formData.page17.knowledgeResults === 'not-achieved'}
                    onChange={() => handleInputChange('knowledgeResults', 'not-achieved')}
                  />
                </div>
                <div>
                  <span className="font-bold">Notes:</span>
                </div>
              </div>
            </div>

            {/* Observation Checklist */}
            <div className="border-b border-gray-300 p-2">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-bold">Observation Checklist</div>
                <div className="flex items-center gap-2">
                  <span>A</span>
                  <input 
                    type="radio" 
                    name="observationResults"
                    checked={formData.page17.observationResults === 'achieved'}
                    onChange={() => handleInputChange('observationResults', 'achieved')}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>NYA</span>
                  <input 
                    type="radio" 
                    name="observationResults"
                    checked={formData.page17.observationResults === 'not-achieved'}
                    onChange={() => handleInputChange('observationResults', 'not-achieved')}
                  />
                </div>
                <div>
                  <span className="font-bold">Notes:</span>
                </div>
              </div>
            </div>

            {/* Assessment Result */}
            <div className="p-2">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-bold">Assessment Result</div>
                <div>
                  <Input 
                    type="date"
                    value={formData.page17.assessmentDate}
                    onChange={(e) => handleInputChange('assessmentDate', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="assessmentResult"
                      checked={formData.page17.assessmentResult === 'competent'}
                      onChange={() => handleInputChange('assessmentResult', 'competent')}
                    />
                    <span className="text-xs">Competent</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="assessmentResult"
                      checked={formData.page17.assessmentResult === 'not-competent'}
                      onChange={() => handleInputChange('assessmentResult', 'not-competent')}
                    />
                    <span className="text-xs">Not yet Competent</span>
                  </label>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          {/* Summative Assessment Results */}
          <div className="mt-4">
            <div className="font-bold text-sm mb-2">SUMMATIVE ASSESSMENT RESULTS</div>
            <div className="border border-gray-300 p-3">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>Knowledge, Practical and workplace application has been completed and assessed</div>
                <div>
                  <Label className="text-xs">DATE:</Label>
                  <Input 
                    type="date"
                    value={formData.page17.summativeDate}
                    onChange={(e) => handleInputChange('summativeDate', e.target.value)}
                    className="h-8 text-xs mt-1"
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="summativeResults"
                      checked={formData.page17.summativeResults === 'completed'}
                      onChange={() => handleInputChange('summativeResults', 'completed')}
                    />
                    <span className="text-xs">Completed</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="summativeResults"
                      checked={formData.page17.summativeResults === 'not-completed'}
                      onChange={() => handleInputChange('summativeResults', 'not-completed')}
                    />
                    <span className="text-xs">Not yet Completed</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Moderation */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Moderation Date:</Label>
                <Input 
                  type="date"
                  value={formData.page17.moderationDate}
                  onChange={(e) => handleInputChange('moderationDate', e.target.value)}
                  className="mt-1 h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-sm">Moderator Name:</Label>
                <Input 
                  value={formData.page17.moderatorName}
                  onChange={(e) => handleInputChange('moderatorName', e.target.value)}
                  className="mt-1 h-8 text-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="border-2 border-form-border p-4">
                <Label className="text-sm font-semibold mb-2 block">Moderator Signature:</Label>
              </div>
              <div className="border-b border-form-border mt-4"></div>
            </div>
          </div>

          {/* Final Signatures */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="mt-4">
              <div className="border-2 border-form-border p-4">
                <Label className="text-sm font-semibold mb-2 block">Learner Signature</Label>
              </div>
              <div className="border-b border-form-border mt-4"></div>
            </div>
            <div className="mt-4">
              <div className="border-2 border-form-border p-4">
                <Label className="text-sm font-semibold mb-2 block">Assessor / Facilitator Signature</Label>
              </div>
              <div className="border-b border-form-border mt-4"></div>
            </div>
          </div>

          {/* Send Button */}
          <div className="text-center mt-8 print:hidden">
            <Button 
              onClick={handleSend}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Send Form
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 print:mt-4">
            <div className="text-sm font-bold">FALL ARREST & RESCUE MANAGEMENT - ToClf</div>
            <div className="text-xs text-muted-foreground mt-1">Page 17 of 17 - Version 1.0</div>
          </div>
        </div>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-green-800">
              ✅ Thank you for your submission!
            </DialogTitle>
          <DialogDescription className="text-lg text-center">
            <div className="space-y-2">
              <div className="font-semibold">Your application has been submitted and is now under review.</div>
              <div className="text-sm text-muted-foreground">
                Application ID: <span className="font-mono font-bold">{submissionId}</span>
              </div>
            </div>
          </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-6">
            <Button 
              onClick={async () => {
                const finalFormData = {
                  ...formData,
                  applicationId: submissionId
                };
                console.log('Downloading PDF with data:', finalFormData);
                await generatePDF(finalFormData);
              }}
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              Download Form
            </Button>
            <Button 
              onClick={handleDialogClose}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormPage17;