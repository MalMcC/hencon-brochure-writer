import React, { useState } from 'react';
import { generateBrochureText } from './api';

const BrochureWriter = () => {
  // Sample data for quick fill
  const sampleData = {
    property_bullets: '- Detached family home in desirable location\n- Four bedrooms including principal with en-suite\n- Walking distance to schools and amenities\n- South facing garden with extensive patio area\n- Double garage with electric doors',
    entrance: 'Spacious entrance hall with porcelain tiled flooring, feature staircase and doors leading to principal reception rooms.',
    kitchen: 'Kitchen/Breakfast Room with a range of fitted wall and base units, Quartz worksurfaces, central island, integrated appliances including double oven, five ring induction hob and dishwasher.',
    living_room: 'Living Room with feature fireplace housing wood burning stove, engineered oak flooring in a herringbone design and double doors leading to the garden.',
    heating: 'Gas central heating system with modern efficient boiler and zonal controls.',
    glazing: 'UPVC double glazed windows throughout providing ample natural light.',
    bedrooms: 'Four generous bedrooms arranged over the first floor, the principal bedroom with fitted wardrobes and luxury en-suite shower room. The second bedroom also benefits from an en-suite, while bedrooms three and four are serviced by the family bathroom.',
    bathrooms: 'Luxury family bathroom featuring white suite comprising panelled bath with shower attachment, separate shower enclosure with rainfall shower, low level WC, pedestal wash hand basin, heated towel rail and ceramic tiled flooring.',
    outside: 'The property is approached via a private block paved driveway providing parking for multiple vehicles and access to the double garage with electric up and over doors. The south facing rear garden features an extensive paved patio area perfect for outdoor entertaining, manicured lawn and established planting.',
    other_key_features: 'Security alarm system, fibre broadband connection, electric vehicle charging point.',
    study: 'Study with fitted cabinetry providing an ideal home office space.',
    dining_room: 'Formal Dining Room with bay window overlooking the front garden.',
    utility_room: 'Utility Room with plumbing for washing machine, space for tumble dryer and door to side access.'
  };

  // State for form inputs
  const [formData, setFormData] = useState({
    property_bullets: '',
    entrance: '',
    kitchen: '',
    living_room: '',
    heating: '',
    glazing: '',
    bedrooms: '',
    bathrooms: '',
    outside: '',
    other_key_features: '',
    study: '',
    dining_room: '',
    drawing_room: '',
    additional_reception: '',
    shower_room: '',
    guest_cloakroom: '',
    utility_room: ''
  });

  // State for generated brochure
  const [generatedBrochure, setGeneratedBrochure] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Load sample data
  const loadSampleData = () => {
    setFormData(sampleData);
  };

  // Clear all fields
  const clearAllFields = () => {
    setFormData({
      property_bullets: '',
      entrance: '',
      kitchen: '',
      living_room: '',
      heating: '',
      glazing: '',
      bedrooms: '',
      bathrooms: '',
      outside: '',
      other_key_features: '',
      study: '',
      dining_room: '',
      drawing_room: '',
      additional_reception: '',
      shower_room: '',
      guest_cloakroom: '',
      utility_room: ''
    });
    setGeneratedBrochure('');
    setError('');
  };

  // Generate brochure text
  const generateBrochure = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const brochureText = await generateBrochureText(formData);
      setGeneratedBrochure(brochureText);
    } catch (err) {
      console.error("Error:", err);
      setError('Failed to generate brochure. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBrochure);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="hc-header mb-8">
          <div className="flex items-center">
            <img 
              src="/images/henderson-connellan-logo.jpg" 
              alt="Henderson Connellan Logo" 
              className="h-20" 
            />
            <h1 className="text-2xl font-normal ml-4">Brochure Writer</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 form-container p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Property Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Overview (bullets)
                </label>
                <textarea
                  name="property_bullets"
                  rows="4"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Enter key property features as bullet points..."
                  value={formData.property_bullets}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entrance
                </label>
                <textarea
                  name="entrance"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the entrance hall..."
                  value={formData.entrance}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kitchen
                </label>
                <textarea
                  name="kitchen"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the kitchen..."
                  value={formData.kitchen}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Living Room
                </label>
                <textarea
                  name="living_room"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the living room..."
                  value={formData.living_room}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heating
                </label>
                <textarea
                  name="heating"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the heating system..."
                  value={formData.heating}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Glazing
                </label>
                <textarea
                  name="glazing"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the glazing..."
                  value={formData.glazing}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <textarea
                  name="bedrooms"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the bedrooms..."
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <textarea
                  name="bathrooms"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the bathrooms..."
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outside
                </label>
                <textarea
                  name="outside"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe the outside areas..."
                  value={formData.outside}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Key Features
                </label>
                <textarea
                  name="other_key_features"
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Describe other key features..."
                  value={formData.other_key_features}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">Optional Rooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Study
                  </label>
                  <textarea
                    name="study"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe the study if applicable..."
                    value={formData.study}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dining Room
                  </label>
                  <textarea
                    name="dining_room"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe the dining room if applicable..."
                    value={formData.dining_room}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drawing Room
                  </label>
                  <textarea
                    name="drawing_room"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe the drawing room if applicable..."
                    value={formData.drawing_room}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Reception
                  </label>
                  <textarea
                    name="additional_reception"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe any additional reception rooms..."
                    value={formData.additional_reception}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shower Room
                  </label>
                  <textarea
                    name="shower_room"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe the shower room if applicable..."
                    value={formData.shower_room}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Cloakroom
                  </label>
                  <textarea
                    name="guest_cloakroom"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe the guest cloakroom if applicable..."
                    value={formData.guest_cloakroom}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Utility Room
                  </label>
                  <textarea
                    name="utility_room"
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Describe the utility room if applicable..."
                    value={formData.utility_room}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="gold-button py-2 px-4 rounded-md font-medium flex items-center justify-center"
                onClick={generateBrochure}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Brochure'}
              </button>
              
              <button
                className="green-button py-2 px-4 rounded-md font-medium flex items-center justify-center"
                onClick={loadSampleData}
              >
                Load Sample Data
              </button>
              
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium flex items-center justify-center"
                onClick={clearAllFields}
              >
                Clear All
              </button>
              
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium flex items-center justify-center"
                onClick={() => setShowGuide(!showGuide)}
              >
                {showGuide ? 'Hide Guide' : 'Show Guide'}
              </button>
            </div>
            
            {showGuide && (
              <div className="mt-4 guide-container p-4 rounded-md text-sm">
                <h3 className="font-semibold text-green-800 mb-2">Brochure Writing Guide</h3>
                <ul className="list-disc pl-5 space-y-1 text-green-700">
                  <li>Use formal, descriptive language with positive and enthusiastic tone</li>
                  <li>Always use "Principal Bedroom" instead of "Master Bedroom"</li>
                  <li>Always capitalize room names (e.g., "Living Room" not "living room")</li>
                  <li>Write numbers as words (e.g., "two" not "2")</li>
                  <li>Provide specific details about materials, designs, and amenities</li>
                  <li>Highlight special features like gardens, architectural elements, and finishes</li>
                  <li>Use evocative language that creates a sense of comfort, luxury, and exclusivity</li>
                </ul>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="output-container p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold output-heading mb-4">Generated Brochure</h2>
              {generatedBrochure && (
                <button
                  className={`inline-flex items-center text-sm px-3 py-1 rounded ${
                    copySuccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={copyToClipboard}
                >
                  {copySuccess ? 'Copied!' : 'Copy text'}
                </button>
              )}
            </div>
            
            {generatedBrochure ? (
              <div className="prose max-w-none bg-gray-50 p-4 rounded border border-gray-200 text-sm h-[calc(100vh-240px)] overflow-y-auto brochure-content">
                <div dangerouslySetInnerHTML={{ __html: generatedBrochure.replace(/\n/g, '<br/>') }} />
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-500 text-sm h-[calc(100vh-240px)] flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                  <p className="mb-2">Fill in the property details and click "Generate Brochure" to create your property description</p>
                  <p className="text-xs text-gray-400">For a quick start, use the "Load Sample Data" button</p>
                </div>
                
                <button
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => setShowExamples(!showExamples)}
                >
                  {showExamples ? 'Hide Example' : 'Show Example Output'}
                </button>
                
                {showExamples && (
                  <div className="mt-4 bg-white p-3 border border-gray-300 rounded text-gray-700 text-xs w-full max-h-64 overflow-y-auto">
                    <p className="font-semibold mb-2">Example Output:</p>
                    <div>
                      <strong>Timeless Appeal</strong><br/><br/>
                      
                      This exceptional detached home commands an impressive presence in this desirable location. The interior includes an entrance hall with porcelain flooring, living room with feature fireplace, free flowing kitchen/dining area, four bedrooms, the principal with en-suite. Outside, private driveway with garage and gardens. Excellent schools are within easy reach. The mainline railway station connecting with London St Pancras International in under an hour is nearby. A wealth of amenities are within easy reach. A truly exceptional home that simply must be viewed to be appreciated.<br/><br/>
                      
                      • Heating: Gas central heating system with modern efficient boiler and zonal controls.<br/><br/>
                      
                      • Glazing: UPVC double glazed windows throughout providing ample natural light.<br/><br/>
                      
                      • Other Key Features: Security alarm system, fibre broadband connection, electric vehicle charging point.<br/><br/>
                      
                      • Entrance Hall: Spacious Entrance Hall with porcelain tiled flooring, feature staircase and doors leading to principal reception rooms.<br/><br/>
                      
                      • Study: Study with fitted cabinetry providing an ideal home office space.<br/><br/>
                      
                      • Living Room: Living Room with feature fireplace housing wood burning stove, engineered oak flooring in a herringbone design and double doors leading to the garden.<br/><br/>
                      
                      • Dining Room: Formal Dining Room with bay window overlooking the front garden.<br/><br/>
                      
                      • Kitchen: Kitchen/Breakfast Room with a range of fitted wall and base units, Quartz worksurfaces, central island, integrated appliances including double oven, five ring induction hob and dishwasher.<br/><br/>
                      
                      • Utility Room: Utility Room with plumbing for washing machine, space for tumble dryer and door to side access.<br/><br/>
                      
                      • Bedrooms: Four generous Bedrooms arranged over the first floor, the Principal Bedroom with fitted wardrobes and luxury en-suite shower room. The second Bedroom also benefits from an en-suite, while Bedrooms three and four are serviced by the family Bathroom.<br/><br/>
                      
                      • Bathrooms: Luxury family Bathroom featuring white suite comprising panelled bath with shower attachment, separate shower enclosure with rainfall shower, low level WC, pedestal wash hand basin, heated towel rail and ceramic tiled flooring.<br/><br/>
                      
                      • Outside: The property is approached via a private block paved driveway providing parking for multiple vehicles and access to the double garage with electric up and over doors. The south facing rear garden features an extensive paved patio area perfect for outdoor entertaining, manicured lawn and established planting.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureWriter;