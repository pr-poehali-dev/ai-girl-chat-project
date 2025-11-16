exports.handler = async (event, context) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }

  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const request = JSON.parse(body || '{}');
    const { message } = request;

    const prompt = generatePromptFromMessage(message);

    const response = await fetch('https://ai.poehali.dev/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Image generation failed');
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      isBase64Encoded: false,
      body: JSON.stringify({
        photoUrl: data.url,
        prompt: prompt
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to generate photo',
        details: error.message || 'Unknown error'
      })
    };
  }
};

function generatePromptFromMessage(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй') || lowerMessage.includes('hi')) {
    return 'beautiful young woman smiling warmly, friendly expression, portrait photography, soft lighting, welcoming pose';
  }

  if (lowerMessage.includes('улыбн') || lowerMessage.includes('smile') || lowerMessage.includes('весел')) {
    return 'attractive young woman with bright genuine smile, happy expression, joyful mood, natural beauty, warm lighting';
  }

  if (lowerMessage.includes('грустн') || lowerMessage.includes('sad') || lowerMessage.includes('печал')) {
    return 'beautiful woman with melancholic expression, thoughtful gaze, soft emotional portrait, gentle lighting';
  }

  if (lowerMessage.includes('фото') || lowerMessage.includes('покаж') || lowerMessage.includes('show')) {
    return 'attractive young woman posing for camera, confident expression, fashionable outfit, professional photography, modern setting';
  }

  if (lowerMessage.includes('сексуальн') || lowerMessage.includes('sexy') || lowerMessage.includes('красив') || lowerMessage.includes('горяч')) {
    return 'beautiful woman in elegant dress, alluring pose, sophisticated styling, intimate atmosphere, artistic photography, tasteful composition';
  }

  if (lowerMessage.includes('откровен') || lowerMessage.includes('интим') || lowerMessage.includes('страст')) {
    return 'attractive woman in romantic setting, sensual pose, soft intimate lighting, elegant lingerie, artistic boudoir photography, tasteful and aesthetic';
  }

  if (lowerMessage.includes('лежа') || lowerMessage.includes('кровать') || lowerMessage.includes('bed')) {
    return 'beautiful woman reclining on bed, relaxed intimate pose, soft bedroom lighting, comfortable casual clothing, cozy atmosphere';
  }

  if (lowerMessage.includes('поза') || lowerMessage.includes('pose')) {
    return 'attractive young woman in dynamic pose, confident body language, professional modeling photography, studio lighting';
  }

  return 'beautiful young woman portrait, natural expression, soft lighting, professional photography, attractive appearance, modern aesthetic';
}
