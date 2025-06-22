'use client';

interface TrainingSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  hasReceivedTraining: boolean;
  setHasReceivedTraining: (value: boolean) => void;
  skillTrainingTypes: string[];
  setSkillTrainingTypes: (value: string[]) => void;
  trainingOrganizers: string[];
  setTrainingOrganizers: (value: string[]) => void;
  desiredSkillTrainings: string[];
  setDesiredSkillTrainings: (value: string[]) => void;
}

export function TrainingSection({
  commonInputStyle,
  commonLabelStyle,
  hasReceivedTraining,
  setHasReceivedTraining,
  skillTrainingTypes,
  setSkillTrainingTypes,
  trainingOrganizers,
  setTrainingOrganizers,
  desiredSkillTrainings,
  setDesiredSkillTrainings
}: TrainingSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Pelatihan</legend>
      
      <div className="flex items-center mt-2 mb-4">
        <input 
          type="checkbox" 
          name="hasReceivedSkillTraining" 
          id="hasReceivedSkillTraining" 
          className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500" 
          onChange={(e) => setHasReceivedTraining(e.target.checked)}
          checked={hasReceivedTraining}
        />
        <label htmlFor="hasReceivedSkillTraining" className="ml-2 block text-sm text-slate-900">Pernah Menerima Pelatihan Keterampilan Usaha?</label>
      </div>
      
      <div className={`mb-4 ${!hasReceivedTraining ? 'opacity-50' : ''}`}>
        <label htmlFor="skillTrainingType" className={commonLabelStyle}>Jenis Pelatihan yang Pernah Diikuti</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            id="skillTrainingType" 
            className={`${commonInputStyle} flex-1`}
            disabled={!hasReceivedTraining}
            placeholder="Contoh: Pelatihan Digital Marketing"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const value = e.currentTarget.value.trim();
                if (value && !skillTrainingTypes.includes(value)) {
                  setSkillTrainingTypes([...skillTrainingTypes, value]);
                  e.currentTarget.value = '';
                }
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              const value = input.value.trim();
              if (value && !skillTrainingTypes.includes(value)) {
                setSkillTrainingTypes([...skillTrainingTypes, value]);
                input.value = '';
              }
            }}
            disabled={!hasReceivedTraining}
            className="px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-700 transition-colors disabled:bg-slate-300"
          >
            Tambah
          </button>
        </div>
        {skillTrainingTypes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {skillTrainingTypes.map((training, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800"
              >
                {training}
                <button
                  type="button"
                  onClick={() => setSkillTrainingTypes(skillTrainingTypes.filter((_, i) => i !== index))}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className={`mb-4 ${!hasReceivedTraining ? 'opacity-50' : ''}`}>
        <label htmlFor="trainingOrganizer" className={commonLabelStyle}>Penyelenggara Pelatihan</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            id="trainingOrganizer" 
            className={`${commonInputStyle} flex-1`}
            disabled={!hasReceivedTraining}
            placeholder="Contoh: Pemerintah Daerah, NGO ABC"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const value = e.currentTarget.value.trim();
                if (value && !trainingOrganizers.includes(value)) {
                  setTrainingOrganizers([...trainingOrganizers, value]);
                  e.currentTarget.value = '';
                }
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              const value = input.value.trim();
              if (value && !trainingOrganizers.includes(value)) {
                setTrainingOrganizers([...trainingOrganizers, value]);
                input.value = '';
              }
            }}
            disabled={!hasReceivedTraining}
            className="px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-700 transition-colors disabled:bg-slate-300"
          >
            Tambah
          </button>
        </div>
        {trainingOrganizers.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {trainingOrganizers.map((organizer, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800"
              >
                {organizer}
                <button
                  type="button"
                  onClick={() => setTrainingOrganizers(trainingOrganizers.filter((_, i) => i !== index))}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="desiredSkillTraining" className={commonLabelStyle}>Pelatihan yang Diinginkan</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            id="desiredSkillTraining" 
            className={`${commonInputStyle} flex-1`}
            placeholder="Contoh: Pelatihan Kewirausahaan"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const value = e.currentTarget.value.trim();
                if (value && !desiredSkillTrainings.includes(value)) {
                  setDesiredSkillTrainings([...desiredSkillTrainings, value]);
                  e.currentTarget.value = '';
                }
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              const value = input.value.trim();
              if (value && !desiredSkillTrainings.includes(value)) {
                setDesiredSkillTrainings([...desiredSkillTrainings, value]);
                input.value = '';
              }
            }}
            className="px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-700 transition-colors"
          >
            Tambah
          </button>
        </div>
        {desiredSkillTrainings.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {desiredSkillTrainings.map((training, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800"
              >
                {training}
                <button
                  type="button"
                  onClick={() => setDesiredSkillTrainings(desiredSkillTrainings.filter((_, i) => i !== index))}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </fieldset>
  );
}
