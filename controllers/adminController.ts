import { Response, Request } from "express";
import { Content } from "../models/Content";
export const getContent = async (req: Request, res: Response) => {
  try {
    const pageTitle = req.query.pageTitle;
    const content = await Content.find().where({
      pageTitle: pageTitle,
    });
    res.send(content);
  } catch (error) {
    res.send("Error cannot find");
  }
};
export const createContent = async (req: Request, res: Response) => {
  const { content, lang, pageTitle } = req.body;
  if (content.length > 0 && lang.length > 0) {
    try {
      const result = await Content.create({ content, lang, pageTitle });
      res.json(result);
    } catch (error) {
      res.status(500).send("Error could not create content");
    }
  } else {
    res.status(400).send("Empty content and no language code");
  }
};

export const updateContent = async (req: Request, res: Response) => {
  const { id, content } = req.body;
  try {
    const resp = await Content.findByIdAndUpdate(
      id,
      {
        content: content,
      },
      {
        new: true,
      }
    );
    res.send(resp);
  } catch (error) {
    res.status(404).send("Content Not found");
  }
};
