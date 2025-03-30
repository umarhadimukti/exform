import { faker } from "@faker-js/faker";
import { prisma } from "../../db/connection";
import { Form } from "@prisma/client";

class QuestionSeeder
{

    public factory(formId: number)
    {
        
        // question types
        const questionTypes: string[] = [
            'text',
            'email',
            'dropdown',
            'radio',
            'checkbox',
          ];
        const questionType: string = faker.helpers.arrayElement(questionTypes);
        
        let options: { id: string, option: string }[] = [];
        let optionCount = faker.number.int({ min: 1, max: 4 });
        for (let i = 0; i < optionCount; i++) {
            options.push({
                id: faker.string.uuid(),
                option: faker.word.words({ count: { min: 1, max: 3 } })
            })
        }
        
        return {
            data: {
                form_id: formId,
                type: questionType,
                question: faker.lorem.sentence(1),
                options,
                required: faker.datatype.boolean(0.5),
            }
        }
    }

    public async seed(counter: number = 10)
    {
        try {
            console.log('🌱 start seeding question seeder..');

            const forms: Form[] = await prisma.form.findMany();
    
            for (let i = 0; i < counter; i++) {
                // get random form
                const form = forms[Math.floor(Math.random() * forms.length)];
                
                await prisma.question.create(this.factory(form.id));
            }

        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
        
    }
}

export default new QuestionSeeder;