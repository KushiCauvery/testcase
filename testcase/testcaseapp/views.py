import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import openai

openai.api_key = settings.OPENAI_API_KEY

@csrf_exempt
def generate_test_cases(request):
    if request.method == 'POST':
        # Deserialize JSON data from request body
        request_data = json.loads(request.body.decode('utf-8'))
        codeSnippet = request_data.get('codeSnippet')
        print(codeSnippet)
        
        sys_prompt = "You are a test case generation assistant."
        user_prompt = f"Generate test cases for the following code:\n\n{codeSnippet}"

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": sys_prompt},
                {"role": "user", "content": user_prompt}
            ]
        )

        test_cases = completion.choices[0].message.content

        return JsonResponse({'test_cases': test_cases})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
