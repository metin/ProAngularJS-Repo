package org.joolzminer.examples.sip.web.controllers;

import java.util.List;

import org.joolzminer.examples.sip.domain.Account;
import org.joolzminer.examples.sip.services.AccountService;
import org.joolzminer.examples.sip.web.dto.AccountDTO;
import org.joolzminer.examples.sip.web.dto.OrderDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/backendapp/accounts")
public class AccountController {
	
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);
	
	@Autowired
	private AccountService accountService;
	
	@RequestMapping(value = "{username}", method = RequestMethod.GET)
	public String getAccountInfo(@PathVariable("username") String username, Model model) {
		Account account = accountService.getAccountByUsername(username);
		model.addAttribute(account);
		return "accounts/account";
	}
	
	@RequestMapping(value = "/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public AccountDTO getAccountInfo(@PathVariable("username") String username) {
		Account account = accountService.getAccountByUsername(username);
		return null;
	}
}


