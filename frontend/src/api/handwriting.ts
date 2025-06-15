import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1/supbase/hello';

interface Point {
  x: number;
  y: number;
  pressure: number;
}

interface HandwritingRequest {
  style_points: Point[];
  text: string;
  max_length?: number;
}

interface HandwritingResponse {
  points: Point[];
  success: boolean;
  message: string;
}

export const handwritingApi = {
  async synthesizeHandwriting(request: HandwritingRequest): Promise<HandwritingResponse> {
    try {
      const response = await axios.post<HandwritingResponse>(
        `${API_BASE_URL}/handwriting/synthesize`,
        request
      );
      return response.data;
    } catch (error) {
      console.error('Error synthesizing handwriting:', error);
      throw error;
    }
  }, 

  async analyzeStyle(request: HandwritingRequest): Promise<HandwritingResponse> {
    try {
      const response = await axios.post<HandwritingResponse>(
        `${API_BASE_URL}/handwriting/analyze-style`,
        request
      );
      return response.data;
    } catch (error) {
      console.error('Error analyzing handwriting style:', error);
      throw error;
    }
  }
}; 