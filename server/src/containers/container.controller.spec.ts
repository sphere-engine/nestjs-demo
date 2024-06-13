import {Test, TestingModule} from '@nestjs/testing';
import {ContainerController} from "./container.controller";
import {ContainerService} from "./container.service";
import {HttpModule} from "@nestjs/axios";

require('dotenv').config();

describe('ContainerController', () => {
    let controller: ContainerController;
    let service: ContainerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [ContainerController],
            providers: [ContainerService],
        }).compile();

        controller = module.get<ContainerController>(ContainerController);
        service = module.get<ContainerService>(ContainerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it("should return positive test response", async () => {
            const token = "some-token";
            jest.spyOn(service, "testContainer").mockImplementation(() => new Promise((resolve) => resolve({"message": "You can use Sphere Engine Containers API"})));

            const result = await service.testContainer(token);

            expect(service.testContainer).toHaveBeenCalled();
            expect(service.testContainer).toHaveBeenCalledWith(token);
            expect(result).toEqual({"message": "You can use Sphere Engine Containers API"});
        }
    );

    it("should handle error", async () => {
        const token = "some-token";
        jest.spyOn(service, "testContainer").mockImplementation(() => new Promise((resolve, reject) => reject("Error")));

        try {
            await service.testContainer(token);
        } catch (e) {
            expect(e).toEqual("Error");
        }
    });

    it("should return the actual response from the service", async () => {
        const token = process.env.CONTAINER_TOKEN;
        const result = await service.testContainer(token);

        console.log(result)

        expect(result).toEqual({"message": "You can use Sphere Engine Containers API"});
    });

    it("should create a submission", async () => {
        const token = "some-token";
        const project_id = "123";
        const mockFile: Express.Multer.File = {
            fieldname: 'file',
            originalname: 'test.tar.gz',
            encoding: '7bit',
            mimetype: 'text/javascript',
            destination: './uploads',
            filename: 'source.tar.gz',
            path: './uploads/test.js',
            size: 1024,
            buffer: Buffer.from("console.log('test');"),
            stream: null
        };
        const scenario = "run";
        const mockResponse = { data: { message: "Submission created" } };

        jest.spyOn(service, 'createSubmission').mockImplementation(async () => new Promise((resolve) => resolve(mockResponse.data)));

        const result = await service.createSubmission(token, project_id, mockFile, scenario);

        expect(service.createSubmission).toHaveBeenCalled();
        expect(service.createSubmission).toHaveBeenCalledWith(token, project_id, mockFile, scenario);
        expect(result).toEqual(mockResponse.data);
    });

    it("should get a submission", async () => {
        const token = "some-token";
        const submission_id = "123";
        const mockResponse = { data: { message: "Submission found" } };

        jest.spyOn(service, 'getSubmission').mockImplementation(async () => new Promise((resolve) => resolve(mockResponse.data)));

        const result = await service.getSubmission(token, submission_id);

        expect(service.getSubmission).toHaveBeenCalled();
        expect(service.getSubmission).toHaveBeenCalledWith(token, submission_id);
        expect(result).toEqual(mockResponse.data);
    });
});
