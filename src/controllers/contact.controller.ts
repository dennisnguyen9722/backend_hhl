import { Request, Response } from 'express'
import * as contactService from '../services/contact.service'

export async function getContact(_req: Request, res: Response) {
  const contact = await contactService.getContact()
  return res.json(contact)
}

export async function updateContact(req: Request, res: Response) {
  const { companyName } = req.body

  if (!companyName) {
    return res.status(400).json({ message: 'Missing companyName' })
  }

  const updated = await contactService.updateContact(req.body)
  return res.json(updated)
}
